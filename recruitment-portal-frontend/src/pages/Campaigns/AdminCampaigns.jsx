import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

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
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import {
  TableShell,
  Table,
  THead,
  Th,
  TBody,
  Tr,
  Td,
} from "../../components/ui/Table";
import { TableLoadingRow } from "../../components/ui/LoadingState";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [showEditJobDrawer, setShowEditJobDrawer] = useState(false);
  const [updatingJob, setUpdatingJob] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const response = await getCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateJob = async (jobId, data) => {
    try {
      setUpdatingJob(true);
      await updateJob(jobId, data);
      toast.success("Job updated successfully");
      setShowEditJobDrawer(false);
      setEditingJob(null);
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

  const handleCreateCampaign = async (data, selectedJobs) => {
    try {
      setCreating(true);
      const response = await createCampaign(data);
      await updateCampaignJobs(response.data.id, selectedJobs);
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

  const handleUpdateCampaign = async (campaignId, data, selectedJobs) => {
    try {
      setUpdating(true);
      await updateCampaign(campaignId, data);
      await updateCampaignJobs(campaignId, selectedJobs);
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

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Campaigns"
          description="Plan and publish hiring campaigns."
          actions={
            <Button onClick={() => setShowCreateDrawer(true)}>
              <Plus size={18} />
              Create campaign
            </Button>
          }
        />

        <div className="flex flex-col gap-3 rounded-[18px] border border-[var(--color-line)] bg-white/80 p-3 sm:flex-row sm:items-center">
          <Input
            type="text"
            placeholder="Search campaigns…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
        </div>

        <TableShell>
          <Table>
            <THead>
              <tr>
                <Th>Title</Th>
                <Th>Status</Th>
                <Th>Start date</Th>
                <Th>End date</Th>
                <Th>Location</Th>
              </tr>
            </THead>
            <TBody>
              {loading ? (
                <TableLoadingRow colSpan={5} label="Loading campaigns…" />
              ) : filteredCampaigns.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={5}
                    className="py-10 text-center text-[var(--color-ink-secondary)]"
                  >
                    No campaigns found
                  </Td>
                </Tr>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <Tr
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <Td className="font-semibold">{campaign.title}</Td>
                    <Td>
                      <Badge status={campaign.status}>
                        {campaign.status}
                      </Badge>
                    </Td>
                    <Td>{campaign.start_date || "—"}</Td>
                    <Td>{campaign.end_date || "—"}</Td>
                    <Td>{campaign.location || "—"}</Td>
                  </Tr>
                ))
              )}
            </TBody>
          </Table>
        </TableShell>
      </div>

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

      <CreateCampaignDrawer
        isOpen={showCreateDrawer}
        onClose={() => setShowCreateDrawer(false)}
        onSubmit={handleCreateCampaign}
        loading={creating}
      />

      <EditCampaignDrawer
        isOpen={showEditDrawer}
        onClose={() => {
          setShowEditDrawer(false);
          setEditingCampaign(null);
        }}
        onSubmit={handleUpdateCampaign}
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
