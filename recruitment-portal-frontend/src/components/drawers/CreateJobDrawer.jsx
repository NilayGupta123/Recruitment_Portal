import { useState } from "react";

export default function CreateJobDrawer({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      department: "",
      employment_type: "",
      experience_required: 0,
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[600px] bg-white h-full overflow-y-auto shadow-xl">

        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            Create Job
          </h2>

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

          <div>
            <label className="block mb-2 font-medium">
              Department
            </label>

            <input
              name="department"
              value={
                formData.department
              }
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Employment Type
            </label>

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
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Experience Required
            </label>

            <input
              type="number"
              name="experience_required"
              value={
                formData.experience_required
              }
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}