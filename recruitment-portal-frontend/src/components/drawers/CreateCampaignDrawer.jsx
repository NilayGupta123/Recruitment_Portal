import { useState } from "react";
import { Sparkles } from "lucide-react";
import JobMultiSelect from "../jobs/JobMultiSelect";
import GenerateDescriptionModal from "../ai/GenerateDescriptionModal";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { Field, Input, Label, Select, Textarea } from "../ui/Input";

export default function CreateCampaignDrawer({
  isOpen,
  onClose,
  onSubmit,
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    setShowDescriptionModal(false);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        title="Create campaign"
        subtitle="Launch a new hiring campaign"
        width="lg"
        footer={
          <div className="flex gap-2.5">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="create-campaign-form"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Creating…" : "Create campaign"}
            </Button>
          </div>
        }
      >
        <form
          id="create-campaign-form"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Field>
            <Label htmlFor="create-campaign-title">Title</Label>
            <Input
              id="create-campaign-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="create-campaign-location">Location</Label>
            <Input
              id="create-campaign-location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Field>

          <JobMultiSelect
            selectedJobs={selectedJobs}
            setSelectedJobs={setSelectedJobs}
          />

          <Field>
            <Label htmlFor="create-campaign-status">Status</Label>
            <Select
              id="create-campaign-status"
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
              <Label htmlFor="create-campaign-start">Start date</Label>
              <Input
                id="create-campaign-start"
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label htmlFor="create-campaign-end">End date</Label>
              <Input
                id="create-campaign-end"
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </Field>
          </div>

          <Field>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label htmlFor="create-campaign-description" className="mb-0">
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
              id="create-campaign-description"
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
