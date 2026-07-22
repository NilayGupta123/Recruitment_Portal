import { useState } from "react";
import GenerateDescriptionModal from "../ai/GenerateDescriptionModal";

export default function CreateJobDrawer({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [showDescriptionModal, setShowDescriptionModal] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    employment_type: "",
    experience_required: 0,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      description: "",
      department: "",
      employment_type: "",
      experience_required: 0,
    });

    setShowDescriptionModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
        <div className="w-[600px] bg-white h-full overflow-y-auto shadow-xl">

          {/* Header */}

          <div className="flex justify-between items-center p-6 border-b">

            <h2 className="text-2xl font-bold">
              Create Job
            </h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-5"
          >

            {/* Title */}

            <div>

              <label className="block mb-2 font-medium">
                Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                required
              />

            </div>

            {/* Department */}

            <div>

              <label className="block mb-2 font-medium">
                Department
              </label>

              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            {/* Employment Type */}

            <div>

              <label className="block mb-2 font-medium">
                Employment Type
              </label>

              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">
                  Select Type
                </option>

                <option value="Full-Time">
                  Full-Time
                </option>

                <option value="Part-Time">
                  Part-Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>

              </select>

            </div>

            {/* Experience */}

            <div>

              <label className="block mb-2 font-medium">
                Experience Required
              </label>

              <input
                type="number"
                name="experience_required"
                value={formData.experience_required}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            {/* Description */}

            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="font-medium">
                  Description
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setShowDescriptionModal(true)
                  }
                  className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm px-4 py-2 rounded-lg shadow transition"
                >
                  ✨ Generate Description
                </button>

              </div>

              <textarea
                rows={8}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 resize-none"
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Create Job
            </button>

          </form>

        </div>

      </div>

      {/* AI Description Modal */}

      <GenerateDescriptionModal
        isOpen={showDescriptionModal}
        entity="Job"
        context={{
          title: formData.title,
          department: formData.department,
          employment_type:
            formData.employment_type,
          experience_required:
            formData.experience_required,
        }}
        onClose={() =>
          setShowDescriptionModal(false)
        }
        onReplace={(description) =>
          setFormData((prev) => ({
            ...prev,
            description,
          }))
        }
      />
    </>
  );
}