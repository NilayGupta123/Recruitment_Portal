import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import JobDrawer from "./JobDrawer";

import { getCampaignJobs } from "../../api/campaignJobApi";

export default function CampaignDrawer({
  campaign,
  onClose,
  onEdit,
  onEditJob
}) {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign) {
      loadCampaignJobs();
    }
  }, [campaign]);

  const loadCampaignJobs = async () => {
    try {
      setLoading(true);

      const response = await getCampaignJobs(
        campaign.id
      );

      setJobs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
        <div className="w-[650px] h-full bg-white shadow-xl overflow-y-auto">

          {/* Header */}

          <div className="flex justify-between items-center p-6 border-b">

            <h2 className="text-2xl font-bold">
              Campaign Details
            </h2>

            <button
              onClick={onClose}
              className="text-2xl text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

          </div>

          {/* Body */}

          <div className="p-6 space-y-6">

            <div>
              <p className="text-sm text-gray-500">
                Title
              </p>

              <p className="text-lg font-semibold">
                {campaign.title}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold
                ${
                  campaign.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : campaign.status === "DRAFT"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {campaign.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p>{campaign.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-sm text-gray-500">
                  Start Date
                </p>

                <p>{campaign.start_date}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  End Date
                </p>

                <p>{campaign.end_date}</p>
              </div>

            </div>

            <div>
              <p className="text-sm text-gray-500">
                Description
              </p>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  campaign.description ||
                  "<p>No description available.</p>",
              }}
            />
            </div>

            {/* Jobs */}

            <div>

              <h3 className="text-lg font-semibold mb-3">
                Jobs in this Campaign
              </h3>

              {loading ? (

                <div className="text-gray-500">
                  Loading jobs...
                </div>

              ) : jobs.length === 0 ? (

                <div className="border rounded-xl p-6 text-center text-gray-500">
                  No jobs assigned to this campaign.
                </div>

              ) : (

                <div className="space-y-3">

                  {jobs.map((job) => (

                    <button
                      key={job.id}
                      onClick={() =>
                        setSelectedJob(job)
                      }
                      className="w-full border rounded-xl p-4 hover:bg-slate-50 transition text-left"
                    >

                      <div className="flex justify-between items-center">

                        <div>

                          <h4 className="font-semibold text-slate-800">
                            {job.title}
                          </h4>

                          <p className="text-sm text-gray-500 mt-1">
                            {job.department}
                          </p>

                        </div>

                        <div className="text-blue-600 font-medium">
                          View →
                        </div>

                      </div>

                    </button>

                  ))}

                </div>

              )}

            </div>

          </div>

          {/* Footer */}

          {(user?.user_type === "ADMIN" ||
            user?.user_type === "HR") && (

            <div className="border-t p-6">

              <button
                onClick={() => onEdit(campaign)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
              >
                Edit Campaign
              </button>

            </div>

          )}

        </div>
      </div>

      {/* Job Drawer */}

      <JobDrawer
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onEdit={(job) => {
          setSelectedJob(null);
          onEditJob(job);
      }}
      />
    </>
  );
}