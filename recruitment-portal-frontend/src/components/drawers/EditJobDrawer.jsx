import { useEffect, useState } from "react";

export default function EditJobDrawer({
  isOpen,
  onClose,
  onSubmit,
  job,
}) {
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      department: "",
      employment_type: "",
      experience_required: 0,
    });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        description:
          job.description || "",
        department:
          job.department || "",
        employment_type:
          job.employment_type || "",
        experience_required:
          job.experience_required || 0,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(job.id, formData);
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[600px] bg-white h-full overflow-y-auto shadow-xl">

        <div className="flex justify-between items-center p-6 border-b">
          <button
        onClick={() => onEdit(job)}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"
        >
        Edit Job
        </button>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            name="employment_type"
            value={
              formData.employment_type
            }
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

          <input
            type="number"
            name="experience_required"
            value={
              formData.experience_required
            }
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            rows={5}
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}