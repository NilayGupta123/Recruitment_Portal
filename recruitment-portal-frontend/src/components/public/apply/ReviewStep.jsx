import { CheckCircle2, FileText } from "lucide-react";

function Item({ label, value }) {
  return (
    <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
        {label}
      </p>
      <p className="mt-1.5 break-all text-[15px] font-medium text-[var(--color-ink)]">
        {value || "—"}
      </p>
    </div>
  );
}

export default function ReviewStep({ formData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
          Review your application
        </h2>
        <p className="mt-1.5 text-[15px] text-[var(--color-ink-secondary)]">
          Please verify all information before submitting.
        </p>
      </div>

      <div className="rounded-[18px] border border-[var(--color-line)] bg-white p-6">
        <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
          Personal information
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Item label="Full name" value={formData.full_name} />
          <Item label="Email" value={formData.email} />
          <Item label="Phone number" value={formData.phone_number} />
          <Item label="Address" value={formData.address} />
        </div>
      </div>

      <div className="rounded-[18px] border border-[var(--color-line)] bg-white p-6">
        <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
          Professional information
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Item
            label="Experience"
            value={`${formData.years_of_experience || 0} years`}
          />
          <Item label="Current company" value={formData.current_company} />
          <Item label="Current CTC" value={formData.current_ctc} />
          <Item label="Expected CTC" value={formData.expected_ctc} />
          <Item label="Notice period" value={formData.notice_period} />
          <Item label="LinkedIn" value={formData.linkedin_url} />
          <Item label="GitHub" value={formData.github_url} />
        </div>
      </div>

      <div className="rounded-[18px] border border-[var(--color-line)] bg-white p-6">
        <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
          Resume
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--color-success-soft)] text-[#1f8f45]">
            <FileText size={22} />
          </div>
          <div>
            <h4 className="font-semibold text-[var(--color-ink)]">
              {formData.resume ? formData.resume.name : "No resume uploaded"}
            </h4>
            {formData.resume && (
              <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                {(formData.resume.size / 1024).toFixed(2)} KB
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-[18px] border border-[rgba(0,113,227,0.16)] bg-[var(--color-brand-soft)] px-5 py-5">
        <div className="flex gap-3">
          <CheckCircle2
            className="mt-0.5 shrink-0 text-[var(--color-brand)]"
            size={22}
          />
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-ink)]">
              Final confirmation
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink-secondary)]">
              By submitting this application, you confirm that all information
              provided is accurate. RecruitPro may contact you regarding this
              application using the email address and phone number you have
              provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}