import { useEffect, useState } from "react";

import JobMultiSelect from "../jobs/JobMultiSelect";
import GenerateDescriptionModal from "../ai/GenerateDescriptionModal";

import { getCampaignJobs } from "../../api/campaignJobApi";

export default function EditCampaignDrawer({
  isOpen,
  onClose,
  onSubmit,
  campaign,
  loading,
}) {
  const [showDescriptionModal, setShowDescriptionModal] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "DRAFT",
    start_date: "",
    end_date: "",
  });

  const [selectedJobs, setSelectedJobs] = useState([]);

  const [loadingJobs, setLoadingJobs] =
    useState(false);

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title || "",
        description: campaign.description || "",
        location: campaign.location || "",
        status: campaign.status || "DRAFT",
        start_date: campaign.start_date || "",
        end_date: campaign.end_date || "",
      });

      loadCampaignJobs();
    }
  }, [campaign]);

  const loadCampaignJobs = async () => {
    try {
      setLoadingJobs(true);

      const response =
        await getCampaignJobs(campaign.id);

      const mappedJobs = response.data.map(
        (job) => ({
          job_id: job.id,
        })
      );

      setSelectedJobs(mappedJobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(
      campaign.id,
      formData,
      selectedJobs
    );
  };

  if (!isOpen || !campaign) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

        <div className="w-[700px] h-full bg-white shadow-xl overflow-y-auto">

          {/* Header */}

          <div className="flex justify-between items-center p-6 border-b">

            <h2 className="text-2xl font-bold">
              Edit Campaign
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

            <div>

              <h3 className="font-semibold text-lg mb-3">
                Jobs
              </h3>

              {loadingJobs ? (

                <div className="text-gray-500">
                  Loading jobs...
                </div>

              ) : (

                <JobMultiSelect
                  selectedJobs={selectedJobs}
                  setSelectedJobs={setSelectedJobs}
                />

              )}

            </div>

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
                  ? "Updating..."
                  : "Update Campaign"}
              </button>

            </div>

          </form>

        </div>

      </div>

      {/* AI Description Modal */}

      <GenerateDescriptionModal
        isOpen={showDescriptionModal}
        entity="Campaign"
        context={{
          title: formData.title,
          location: formData.location,
          status: formData.status,
          start_date: formData.start_date,
          end_date: formData.end_date,
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