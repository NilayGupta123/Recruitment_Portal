import { useState } from "react";
import JobMultiSelect from "../jobs/JobMultiSelect";

export default function CreateCampaignDrawer({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "DRAFT",
    start_date: "",
    end_date: "",
  });

  const [selectedJobs, setSelectedJobs] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData, selectedJobs);

    setFormData({
      title: "",
      description: "",
      location: "",
      status: "DRAFT",
      start_date: "",
      end_date: "",
    });

    setSelectedJobs([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[650px] h-full bg-white shadow-xl overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            Create Campaign
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Jobs */}
          <JobMultiSelect
            selectedJobs={selectedJobs}
            setSelectedJobs={setSelectedJobs}
          />

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="DRAFT">
                Draft
              </option>

              <option value="PUBLISHED">
                Published
              </option>

              <option value="CLOSED">
                Closed
              </option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Start Date
              </label>

              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                End Date
              </label>

              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Campaign"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}