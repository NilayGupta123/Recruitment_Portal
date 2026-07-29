import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { generateScreeningQuestions } from "../../api/aiApi";

export default function JobDrawer({
  job,
  onClose,
  onEdit,
}) {
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] =
    useState(false);

  const handleGenerateQuestions = async () => {
    try {
      setLoadingQuestions(true);

      const response =
        await generateScreeningQuestions({
          job: {
            title: job.title,
            department: job.department,
            description: job.description,
            employment_type:
              job.employment_type,
            experience_required:
              job.experience_required,
            skills:
              job.skills?.map(
                (skill) =>
                  skill.skill_name
              ) || [],
          },
        });

      setQuestions(
        response.data.questions
      );

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingQuestions(false);
    }
  };
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[500px] h-full bg-white shadow-xl p-6 overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Job Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Job Information */}
        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              Title
            </p>

            <p className="font-semibold text-lg">
              {job.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Department
            </p>

            <p>{job.department || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Employment Type
            </p>

            <p>{job.employment_type || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Experience Required
            </p>

            <p>
              {job.experience_required
                ? `${job.experience_required} Years`
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Description
            </p>

            <div
              className="prose max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  job.description ||
                  "<p>No description available</p>",
              }}
            />
          </div>

          {questions.length > 0 && (
            <div className="mt-8">

              <h3 className="text-xl font-bold mb-4">
                AI Screening Questions
              </h3>

              <div className="space-y-4">

                {questions.map((q, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4"
                  >

                    <div className="flex justify-between">

                      <span className="font-semibold">
                        {q.topic}
                      </span>

                      <span className="text-sm text-violet-600">
                        {q.difficulty}
                      </span>

                    </div>

                    <p className="mt-3 font-medium">
                      {index + 1}. {q.question}
                    </p>

                    <p className="mt-3 text-gray-600">
                      <strong>Expected Answer:</strong>
                      <br />
                      {q.expected_answer}
                    </p>

                  </div>

                ))}

              </div>

            </div>
          )}

        </div>

        {/* Actions */}

        {(user?.user_type === "ADMIN" ||
          user?.user_type === "HR") && (
          <div className="mt-8 space-y-4">

            <button
              onClick={handleGenerateQuestions}
              disabled={loadingQuestions}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-medium"
            >
              {loadingQuestions
                ? "Generating..."
                : "✨ Generate Screening Questions"}
            </button>

            <button
              onClick={() => onEdit(job)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
            >
              Edit Job
            </button>

          </div>
        )}

      </div>
    </div>
  );
}