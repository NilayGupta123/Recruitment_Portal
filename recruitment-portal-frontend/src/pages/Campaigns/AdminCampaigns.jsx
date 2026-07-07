import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CampaignDrawer from "../../components/drawers/CampaignDrawer";
import CreateCampaignDrawer from "../../components/drawers/CreateCampaignDrawer";
import EditCampaignDrawer from "../../components/drawers/EditCampaignDrawer";
import { updateCampaignJobs } from "../../api/campaignJobApi";
import EditJobDrawer from "../../components/drawers/EditJobDrawer";
import { updateJob } from "../../api/jobsApi";

import {
  getCampaigns,
  createCampaign,
  updateCampaign,
} from "../../api/campaignsApi";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCampaign, setSelectedCampaign] =
    useState(null);

  const [showCreateDrawer, setShowCreateDrawer] =
    useState(false);

  const [showEditDrawer, setShowEditDrawer] =
    useState(false);

  const [editingCampaign, setEditingCampaign] =
    useState(null);

  const [creating, setCreating] =
    useState(false);

  const [updating, setUpdating] =
    useState(false);

  const [editingJob, setEditingJob] = useState(null);

  const [showEditJobDrawer, setShowEditJobDrawer] = useState(false);

  const [updatingJob, setUpdatingJob] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const response =
        await getCampaigns();

      setCampaigns(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateJob = async (jobId, data) => {
    try {
      setUpdatingJob(true);

      await updateJob(jobId, data);

      toast.success("Job updated successfully");

      setShowEditJobDrawer(false);
      setEditingJob(null);

      // Refresh campaign jobs so the drawer shows updated data
      if (selectedCampaign) {
        setSelectedCampaign({ ...selectedCampaign });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update job");
    } finally {
      setUpdatingJob(false);
    }
  };

  const handleCreateCampaign = 
  async (data,selectedJobs) => {
    try {
      setCreating(true);

      const response = await createCampaign(data);

      await updateCampaignJobs(
        response.data.id,
        selectedJobs
      );

      toast.success("Campaign created successfully");

      await loadCampaigns();

      setShowCreateDrawer(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to create campaign");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateCampaign = async (
    campaignId,
    data,
    selectedJobs
  ) => {
    try {
      setUpdating(true);

      // Update campaign details
      await updateCampaign(campaignId, data);

      // Update job mappings
      await updateCampaignJobs(
        campaignId,
        selectedJobs
      );

      toast.success("Campaign updated successfully");

      await loadCampaigns();

      setShowEditDrawer(false);
      setEditingCampaign(null);
      setSelectedCampaign(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update campaign");
    } finally {
      setUpdating(false);
    }
  };

  const filteredCampaigns =
    campaigns.filter((campaign) =>
      campaign.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const getStatusBadge = (status) => {
    const colors = {
      DRAFT:
        "bg-yellow-100 text-yellow-700",
      PUBLISHED:
        "bg-green-100 text-green-700",
      CLOSED:
        "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          colors[status] ||
          "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <h1 className="text-4xl font-bold text-slate-800">
            Campaigns
          </h1>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-slate-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() =>
                setShowCreateDrawer(true)
              }
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              + Create Campaign
            </button>
          </div>
        </div>

        {/* Campaign Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left p-4 font-semibold">
                  Title
                </th>

                <th className="text-left p-4 font-semibold">
                  Status
                </th>

                <th className="text-left p-4 font-semibold">
                  Start Date
                </th>

                <th className="text-left p-4 font-semibold">
                  End Date
                </th>

                <th className="text-left p-4 font-semibold">
                  Location
                </th>

                <th className="text-left p-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCampaigns.length ===
              0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500"
                  >
                    No campaigns found
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map(
                  (campaign) => (
                    <tr
                      key={campaign.id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="p-4 font-medium">
                        {campaign.title}
                      </td>

                      <td className="p-4">
                        {getStatusBadge(
                          campaign.status
                        )}
                      </td>

                      <td className="p-4">
                        {
                          campaign.start_date
                        }
                      </td>

                      <td className="p-4">
                        {campaign.end_date}
                      </td>

                      <td className="p-4">
                        {
                          campaign.location
                        }
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            setSelectedCampaign(
                              campaign
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Drawer */}
      <CampaignDrawer
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onEdit={(campaign) => {
              setEditingCampaign(campaign);
              setShowEditDrawer(true);
          }}
          onEditJob={(job) => {
              setEditingJob(job);
              setShowEditJobDrawer(true);
          }}
      />

      {/* Create Drawer */}
      <CreateCampaignDrawer
        isOpen={showCreateDrawer}
        onClose={() =>
          setShowCreateDrawer(false)
        }
        onSubmit={
          handleCreateCampaign
        }
        loading={creating}
      />

      {/* Edit Drawer */}
      <EditCampaignDrawer
        isOpen={showEditDrawer}
        onClose={() => {
          setShowEditDrawer(false);
          setEditingCampaign(null);
        }}
        onSubmit={
          handleUpdateCampaign
        }
        campaign={editingCampaign}
        loading={updating}
      />

      <EditJobDrawer
          isOpen={showEditJobDrawer}
          job={editingJob}
          loading={updatingJob}
          onClose={() => {
              setShowEditJobDrawer(false);
              setEditingJob(null);
          }}
          onSubmit={handleUpdateJob}
      />
    </>
  );
}