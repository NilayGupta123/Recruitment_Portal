import { useEffect, useState } from "react";

export default function EditCampaignDrawer({
  isOpen,
  onClose,
  onSubmit,
  campaign,
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

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title || "",
        description:
          campaign.description || "",
        location:
          campaign.location || "",
        status:
          campaign.status || "DRAFT",
        start_date:
          campaign.start_date || "",
        end_date:
          campaign.end_date || "",
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(campaign.id, formData);
  };

  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[650px] bg-white h-full overflow-y-auto shadow-xl">

        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            Edit Campaign
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
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
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

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
                DRAFT
              </option>

              <option value="PUBLISHED">
                PUBLISHED
              </option>

              <option value="CLOSED">
                CLOSED
              </option>
            </select>
          </div>

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

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update Campaign"}
          </button>
        </form>
      </div>
    </div>
  );
}