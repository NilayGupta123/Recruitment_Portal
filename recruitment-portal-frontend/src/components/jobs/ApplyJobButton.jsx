import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle2, Send, Upload } from "lucide-react";

import { applyToJob } from "../../api/applicantApi";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function ApplyJobButton({ job, application, onApplied }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleApply = async () => {
    try {
      setLoading(true);
      await applyToJob(job.mapping_id, selectedFile);
      toast.success("Application submitted successfully!");
      if (onApplied) {
        await onApplied();
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.detail || "Failed to apply.");
    } finally {
      setLoading(false);
    }
  };

  if (application) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-[16px] border border-[rgba(52,199,89,0.25)] bg-[var(--color-success-soft)] px-4 py-3.5">
          <CheckCircle2 size={20} className="text-[#1f8f45]" />
          <div>
            <h3 className="font-semibold text-[#1f8f45]">
              You have already applied
            </h3>
            <p className="text-sm text-[var(--color-ink-secondary)]">
              Current application status
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Badge status={application.status}>{application.status}</Badge>
          <Button disabled variant="outline">
            Already applied
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="pressable flex w-full items-center justify-between gap-3 rounded-[16px] border border-dashed border-[rgba(0,113,227,0.35)] bg-[var(--color-brand-soft)] px-4 py-3.5 text-left text-sm font-medium text-[var(--color-brand)]"
      >
        <span className="inline-flex items-center gap-2">
          <Upload size={16} />
          {selectedFile
            ? selectedFile.name
            : "Upload resume for this application"}
        </span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
      <Button className="w-full" onClick={handleApply} disabled={loading}>
        <Send size={16} />
        {loading ? "Submitting…" : "Apply now"}
      </Button>
    </div>
  );
}
