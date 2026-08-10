import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { generateScreeningQuestions } from "../../api/aiApi";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

function Detail({ label, children }) {
  return (
    <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
        {label}
      </p>
      <div className="mt-1.5 text-[15px] font-medium text-[var(--color-ink)]">
        {children}
      </div>
    </div>
  );
}

export default function JobDrawer({ job, onClose, onEdit }) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  if (!job) return null;

  const handleGenerateQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const response = await generateScreeningQuestions({
        job: {
          title: job.title,
          department: job.department,
          description: job.description,
          employment_type: job.employment_type,
          experience_required: job.experience_required,
          skills: job.skills?.map((skill) => skill.skill_name) || [],
        },
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const canManage = user?.user_type === "ADMIN" || user?.user_type === "HR";

  return (
    <Drawer
      open={!!job}
      onClose={onClose}
      title="Job details"
      subtitle={job.title}
      footer={
        canManage ? (
          <div className="flex flex-col gap-2.5">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleGenerateQuestions}
              disabled={loadingQuestions}
            >
              <Sparkles size={16} />
              {loadingQuestions ? "Generating…" : "Generate screening questions"}
            </Button>
            <Button className="w-full" onClick={() => onEdit(job)}>
              Edit job
            </Button>
          </div>
        ) : null
      }
    >
      <div className="space-y-4">
        <Detail label="Title">{job.title}</Detail>
        <Detail label="Department">{job.department || "N/A"}</Detail>
        <Detail label="Employment type">{job.employment_type || "N/A"}</Detail>
        <Detail label="Experience required">
          {job.experience_required ? `${job.experience_required} years` : "N/A"}
        </Detail>
        <div className="rounded-[16px] border border-[var(--color-line)] bg-white px-4 py-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
            Description
          </p>
          <div
            className="prose mt-2 max-w-none text-[15px] leading-7 text-[var(--color-ink-secondary)]"
            dangerouslySetInnerHTML={{
              __html: job.description || "<p>No description available</p>",
            }}
          />
        </div>

        {questions.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              AI screening questions
            </h3>
            {questions.map((q, index) => (
              <div
                key={index}
                className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--color-ink)]">{q.topic}</p>
                  <Badge tone="brand">{q.difficulty}</Badge>
                </div>
                <p className="mt-3 text-[15px] font-medium text-[var(--color-ink)]">
                  {index + 1}. {q.question}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-ink-secondary)]">
                  <span className="font-semibold text-[var(--color-ink)]">
                    Expected answer:
                  </span>{" "}
                  {q.expected_answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
}
