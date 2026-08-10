import { Field, Input, Label, Select } from "../../ui/Input";

export default function ProfessionalInfoStep({ formData, updateField }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
          Professional information
        </h2>
        <p className="mt-1.5 text-[15px] text-[var(--color-ink-secondary)]">
          Help us understand your professional background.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field>
          <Label>Years of experience</Label>
          <Input
            type="number"
            min="0"
            value={formData.years_of_experience}
            onChange={(e) =>
              updateField("years_of_experience", e.target.value)
            }
            placeholder="3"
          />
        </Field>

        <Field>
          <Label>Current company</Label>
          <Input
            value={formData.current_company}
            onChange={(e) => updateField("current_company", e.target.value)}
            placeholder="Google"
          />
        </Field>

        <Field>
          <Label>Current CTC (LPA)</Label>
          <Input
            type="number"
            value={formData.current_ctc}
            onChange={(e) => updateField("current_ctc", e.target.value)}
            placeholder="8"
          />
        </Field>

        <Field>
          <Label>Expected CTC (LPA)</Label>
          <Input
            type="number"
            value={formData.expected_ctc}
            onChange={(e) => updateField("expected_ctc", e.target.value)}
            placeholder="12"
          />
        </Field>

        <Field>
          <Label>Notice period</Label>
          <Select
            value={formData.notice_period}
            onChange={(e) =>
              updateField(
                "notice_period",
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
          >
            <option value="">Select</option>
            <option value={0}>Immediate</option>
            <option value={15}>15 Days</option>
            <option value={30}>30 Days</option>
            <option value={60}>60 Days</option>
            <option value={90}>90 Days</option>
          </Select>
        </Field>
      </div>

      <div className="border-t border-[var(--color-line)] pt-8">
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
          Professional links
        </h3>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field>
            <Label>LinkedIn profile</Label>
            <Input
              value={formData.linkedin_url}
              onChange={(e) => updateField("linkedin_url", e.target.value)}
              placeholder="https://linkedin.com/in/..."
            />
          </Field>
          <Field>
            <Label>GitHub profile</Label>
            <Input
              value={formData.github_url}
              onChange={(e) => updateField("github_url", e.target.value)}
              placeholder="https://github.com/..."
            />
          </Field>
        </div>
      </div>

      <div className="rounded-[18px] border border-[rgba(255,159,10,0.25)] bg-[rgba(255,159,10,0.1)] px-5 py-5">
        <h3 className="font-semibold text-[#b25000]">Profile tips</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-ink-secondary)]">
          <li>Keep your LinkedIn profile updated.</li>
          <li>Add your GitHub if you have personal projects.</li>
          <li>Mention accurate salary expectations.</li>
          <li>Be honest about your notice period.</li>
        </ul>
      </div>
    </div>
  );
}
