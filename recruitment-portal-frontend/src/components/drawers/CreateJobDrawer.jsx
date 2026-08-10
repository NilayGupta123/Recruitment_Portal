import { useState } from "react";
import { Sparkles } from "lucide-react";
import GenerateDescriptionModal from "../ai/GenerateDescriptionModal";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { Field, Input, Label, Select, Textarea } from "../ui/Input";

export default function CreateJobDrawer({ isOpen, onClose, onSubmit }) {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    employment_type: "",
    experience_required: 0,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      description: "",
      department: "",
      employment_type: "",
      experience_required: 0,
    });

    setShowDescriptionModal(false);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        title="Create job"
        subtitle="Add a new open role"
        width="lg"
        footer={
          <div className="flex gap-2.5">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="create-job-form" className="flex-1">
              Create job
            </Button>
          </div>
        }
      >
        <form id="create-job-form" onSubmit={handleSubmit} className="space-y-5">
          <Field>
            <Label htmlFor="create-job-title">Title</Label>
            <Input
              id="create-job-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer"
              required
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label htmlFor="create-job-department">Department</Label>
              <Input
                id="create-job-department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Engineering"
              />
            </Field>

            <Field>
              <Label htmlFor="create-job-employment">Employment type</Label>
              <Select
                id="create-job-employment"
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </Select>
            </Field>
          </div>

          <Field>
            <Label htmlFor="create-job-experience">Experience required (years)</Label>
            <Input
              id="create-job-experience"
              type="number"
              min={0}
              name="experience_required"
              value={formData.experience_required}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label htmlFor="create-job-description" className="mb-0">
                Description
              </Label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowDescriptionModal(true)}
              >
                <Sparkles size={14} />
                Generate with AI
              </Button>
            </div>
            <Textarea
              id="create-job-description"
              rows={10}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and requirements…"
              className="min-h-[200px] resize-y"
            />
            {formData.description?.includes("<") && (
              <div className="mt-3 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-canvas)] p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                  Preview
                </p>
                <div
                  className="prose prose-sm max-w-none text-[var(--color-ink-secondary)]"
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              </div>
            )}
          </Field>
        </form>
      </Drawer>

      <GenerateDescriptionModal
        isOpen={showDescriptionModal}
        entity="Job"
        context={{
          title: formData.title,
          department: formData.department,
          employment_type: formData.employment_type,
          experience_required: formData.experience_required,
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
