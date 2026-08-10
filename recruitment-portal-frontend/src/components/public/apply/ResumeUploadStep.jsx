import { useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, Trash2, Info } from "lucide-react";
import Button from "../../ui/Button";

export default function ResumeUploadStep({ formData, updateField }) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateField("resume", file);
    }
  };

  const removeResume = () => {
    updateField("resume", null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
          Resume upload
        </h2>
        <p className="mt-1.5 text-[15px] text-[var(--color-ink-secondary)]">
          Upload your latest resume to continue.
        </p>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="pressable w-full cursor-pointer rounded-[22px] border-2 border-dashed border-[rgba(0,113,227,0.35)] bg-[var(--color-brand-soft)] px-8 py-14 text-center transition hover:bg-[rgba(0,113,227,0.12)]"
      >
        <UploadCloud
          className="mx-auto text-[var(--color-brand)]"
          size={48}
        />
        <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
          Drag & drop resume
        </h3>
        <p className="mt-2 text-sm text-[var(--color-ink-secondary)]">
          or click to browse
        </p>
        <p className="mt-5 text-xs text-[var(--color-ink-tertiary)]">
          PDF • DOC • DOCX
          <br />
          Maximum size: 5 MB
        </p>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </button>

      {formData.resume && (
        <div className="rounded-[18px] border border-[rgba(52,199,89,0.25)] bg-[var(--color-success-soft)] px-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#1f8f45] text-white">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-ink)]">
                  {formData.resume.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                  {(formData.resume.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-[#1f8f45]" size={22} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={removeResume}
                aria-label="Remove resume"
              >
                <Trash2 size={18} className="text-[var(--color-danger)]" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[18px] border border-[rgba(255,159,10,0.25)] bg-[rgba(255,159,10,0.1)] px-5 py-5">
        <div className="flex gap-3">
          <Info className="mt-0.5 text-[var(--color-accent)]" size={20} />
          <div>
            <h3 className="font-semibold text-[var(--color-ink)]">
              Resume tips
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-ink-secondary)]">
              <li>Keep your resume to one or two pages.</li>
              <li>Highlight measurable achievements.</li>
              <li>Mention relevant technologies.</li>
              <li>Keep formatting clean and readable.</li>
              <li>Upload the latest version.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-[18px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-5 py-5">
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
          Resume analysis
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-ink-secondary)]">
          After uploading your resume, RecruitPro will automatically analyze
          your resume and compare it with the job requirements.
        </p>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-[var(--color-ink-secondary)]">
              Resume match
            </span>
            <span className="font-semibold text-[var(--color-ink)]">
              Coming soon
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-black/[0.06]">
            <div className="h-full w-0 rounded-full bg-[var(--color-brand)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
