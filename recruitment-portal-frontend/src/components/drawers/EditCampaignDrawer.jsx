import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import JobMultiSelect from "../jobs/JobMultiSelect";
import GenerateDescriptionModal from "../ai/GenerateDescriptionModal";
import { getCampaignJobs } from "../../api/campaignJobApi";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { Field, Input, Label, Select, Textarea } from "../ui/Input";

export default function EditCampaignDrawer({
  isOpen,
  onClose,
  onSubmit,
  campaign,
  loading,
}) {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "DRAFT",
    start_date: "",
    end_date: "",
  });

  const [selectedJobs, setSelectedJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

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
      const response = await getCampaignJobs(campaign.id);
      const mappedJobs = response.data.map((job) => ({
        job_id: job.id,
      }));
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
    onSubmit(campaign.id, formData, selectedJobs);
  };

  return (
    <>
      <Drawer
        open={isOpen && !!campaign}
        onClose={onClose}
        title="Edit campaign"
        subtitle={campaign?.title}
        width="lg"
        footer={
          <div className="flex gap-2.5">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-campaign-form"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Updating…" : "Update campaign"}
            </Button>
          </div>
        }
      >
        <form
          id="edit-campaign-form"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Field>
            <Label htmlFor="edit-campaign-title">Title</Label>
            <Input
              id="edit-campaign-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <Label htmlFor="edit-campaign-location">Location</Label>
            <Input
              id="edit-campaign-location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Field>

          <div>
            <p className="mb-3 text-[13px] font-semibold tracking-[-0.01em] text-[var(--color-ink-secondary)]">
              Jobs
            </p>
            {loadingJobs ? (
              <p className="text-sm text-[var(--color-ink-secondary)]">
                Loading jobs…
              </p>
            ) : (
              <JobMultiSelect
                selectedJobs={selectedJobs}
                setSelectedJobs={setSelectedJobs}
              />
            )}
          </div>

          <Field>
            <Label htmlFor="edit-campaign-status">Status</Label>
            <Select
              id="edit-campaign-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="CLOSED">Closed</option>
            </Select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <Label htmlFor="edit-campaign-start">Start date</Label>
              <Input
                id="edit-campaign-start"
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label htmlFor="edit-campaign-end">End date</Label>
              <Input
                id="edit-campaign-end"
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </Field>
          </div>

          <Field>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label htmlFor="edit-campaign-description" className="mb-0">
                Description
              </Label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowDescriptionModal(true)}
              >
                <Sparkles size={14} />
                Generate
              </Button>
            </div>
            <Textarea
              id="edit-campaign-description"
              rows={8}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-[180px] resize-none"
            />
          </Field>
        </form>
      </Drawer>

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
        onClose={() => setShowDescriptionModal(false)}
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
