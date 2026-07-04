import { useState } from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";

import ApplicantJobDrawer from "../jobs/ApplicantJobDrawer";

export default function ApplicantCampaignDrawer({
  campaign,
  jobs,
  applications,
  onClose,
}) {
  const [selectedJob, setSelectedJob] =
    useState(null);

  if (!campaign) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

        {/* Drawer */}

        <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-xl">

          {/* Header */}

          <div className="flex justify-between items-center border-b p-6">

            <div>

              <h2 className="text-2xl font-bold">
                {campaign.title}
              </h2>

              <p className="text-gray-500">
                Campaign Details
              </p>

            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              <FaTimes size={22} />
            </button>

          </div>

          {/* Body */}

          <div className="p-6 space-y-6">

            {/* Description */}

            <div>

              <h3 className="text-xl font-bold mb-3">
                Description
              </h3>

              <div className="bg-gray-50 rounded-xl p-5 leading-7">

                {campaign.description ||
                  "No description available."}

              </div>

            </div>

            {/* Information */}

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-3">

                  <FaMapMarkerAlt className="text-blue-600" />

                  <div>

                    <p className="text-gray-500 text-sm">
                      Location
                    </p>

                    <h3 className="font-semibold">
                      {campaign.location ||
                        "Remote"}
                    </h3>

                  </div>

                </div>

              </div>

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-3">

                  <FaCalendarAlt className="text-green-600" />

                  <div>

                    <p className="text-gray-500 text-sm">
                      Duration
                    </p>

                    <h3 className="font-semibold">

                      {campaign.start_date
                        ? new Date(
                            campaign.start_date
                          ).toLocaleDateString()
                        : "-"}

                      {"  "} - {"  "}

                      {campaign.end_date
                        ? new Date(
                            campaign.end_date
                          ).toLocaleDateString()
                        : "-"}

                    </h3>

                  </div>

                </div>

              </div>

            </div>

            {/* Jobs */}

            <div>

              <h3 className="text-xl font-bold mb-4">
                Available Jobs
              </h3>

              {jobs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">

                  <FaBriefcase
                    size={45}
                    className="mx-auto text-gray-400"
                  />

                  <p className="mt-4 text-gray-500">
                    No jobs available.
                  </p>

                </div>
              ) : (

                <div className="space-y-4">

                  {jobs.map((job) => (

                    <div
                      key={job.id}
                      className="border rounded-xl p-5 hover:border-blue-500 hover:shadow transition cursor-pointer"
                      onClick={() =>
                        setSelectedJob(job)
                      }
                    >

                      <div className="flex justify-between">

                        <div>

                          <h4 className="text-lg font-bold">
                            {job.title}
                          </h4>

                          <p className="text-gray-500 mt-1">
                            {job.department}
                          </p>

                        </div>

                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">

                          View

                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Job Drawer */}
        <ApplicantJobDrawer
        job={selectedJob}
        application={
            selectedJob
            ? applications[selectedJob.id]
            : null
        }
        onClose={() =>
            setSelectedJob(null)
        }
        onApplied={() => {}}
        />

    </>
  );
}