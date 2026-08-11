import { useCallback, useEffect, useState } from "react";
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
  deleteCampaign,
} from "../../api/campaignsApi";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Input, Select } from "../../components/ui/Input";
import Pagination from "../../components/ui/Pagination";
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

const PAGE_SIZE = 10;

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
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
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const loadCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCampaigns({
        page,
        page_size: PAGE_SIZE,
        q: debouncedSearch || undefined,
        status: statusFilter || undefined,
      });
      const data = response.data || {};
      setCampaigns(data.items || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

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
      setPage(1);
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

  const handleDeleteCampaign = async (campaign) => {
    await deleteCampaign(campaign.id);
    toast.success("Campaign deleted successfully");
    setSelectedCampaign(null);
    if (campaigns.length === 1 && page > 1) {
      setPage((p) => p - 1);
    } else {
      await loadCampaigns();
    }
  };

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

        <div className="flex flex-col gap-3 rounded-[18px] border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-3 sm:flex-row sm:items-center">
          <Input
            type="text"
            placeholder="Search campaigns…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="sm:max-w-[180px]"
          >
            <option value="">All statuses</option>
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="CLOSED">CLOSED</option>
          </Select>
        </div>

        <TableShell
          footer={
            <Pagination
              page={page}
              pages={pages}
              total={total}
              pageSize={PAGE_SIZE}
              onChange={setPage}
              disabled={loading}
            />
          }
        >
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
              ) : campaigns.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={5}
                    className="py-10 text-center text-[var(--color-ink-secondary)]"
                  >
                    No campaigns found
                  </Td>
                </Tr>
              ) : (
                campaigns.map((campaign) => (
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
        onDelete={handleDeleteCampaign}
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
