import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import GenerateDescriptionModal from "../ai/GenerateDescriptionModal";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { Field, Input, Label, Select, Textarea } from "../ui/Input";

export default function EditJobDrawer({ isOpen, onClose, onSubmit, job }) {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    employment_type: "",
    experience_required: 0,
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        description: job.description || "",
        department: job.department || "",
        employment_type: job.employment_type || "",
        experience_required: job.experience_required || 0,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(job.id, formData);
  };

  return (
    <>
      <Drawer
        open={isOpen && !!job}
        onClose={onClose}
        title="Edit job"
        subtitle={job?.title}
        width="lg"
        footer={
          <div className="flex gap-2.5">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="edit-job-form" className="flex-1">
              Update job
            </Button>
          </div>
        }
      >
        <form id="edit-job-form" onSubmit={handleSubmit} className="space-y-5">
          <Field>
            <Label htmlFor="edit-job-title">Title</Label>
            <Input
              id="edit-job-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <Label htmlFor="edit-job-department">Department</Label>
            <Input
              id="edit-job-department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <Label htmlFor="edit-job-employment">Employment type</Label>
            <Select
              id="edit-job-employment"
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

          <Field>
            <Label htmlFor="edit-job-experience">Experience required</Label>
            <Input
              id="edit-job-experience"
              type="number"
              name="experience_required"
              value={formData.experience_required}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label htmlFor="edit-job-description" className="mb-0">
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
              id="edit-job-description"
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
