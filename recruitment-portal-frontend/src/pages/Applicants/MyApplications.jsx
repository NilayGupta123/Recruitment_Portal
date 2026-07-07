import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getMyApplications } from "../../api/applicantApi";

import MyApplicationsTable from "../../components/applicants/MyApplicationsTable";
import ApplicationDetailsDrawer from "../../components/applicants/ApplicationDetailsDrawer";

export default function MyApplications() {
  const [applications, setApplications] =
    useState([]);

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const res =
        await getMyApplications();

      setApplications(res.data);
    } catch (err) {
      console.error(err);

      toast.error(
        "Unable to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications =
    useMemo(() => {
      return applications.filter((app) => {

        const matchesSearch =
          app.job_title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =
          !status ||
          app.status === status;

        return (
          matchesSearch &&
          matchesStatus
        );
      });
    }, [
      applications,
      search,
      status,
    ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <p className="text-gray-500">
            Track your job applications.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="">
              All Status
            </option>

            <option>
              Applied
            </option>

            <option>
              Shortlisted
            </option>

            <option>
              Interview Scheduled
            </option>

            <option>
              Selected
            </option>

            <option>
              Rejected
            </option>

          </select>

        </div>

        <MyApplicationsTable
          applications={
            filteredApplications
          }
          onView={
            setSelectedApplication
          }
        />

      </div>

      <ApplicationDetailsDrawer
        application={
          selectedApplication
        }
        onClose={() =>
          setSelectedApplication(
            null
          )
        }
      />

    </>
  );
}