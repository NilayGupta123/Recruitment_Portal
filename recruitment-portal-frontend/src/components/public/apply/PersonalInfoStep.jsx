import { Field, Input, Label } from "../../ui/Input";

export default function PersonalInfoStep({ formData, updateField }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
          Personal information
        </h2>
        <p className="mt-1.5 text-[15px] text-[var(--color-ink-secondary)]">
          Tell us a little about yourself.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field>
          <Label>Full name *</Label>
          <Input
            type="text"
            value={formData.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            placeholder="John Doe"
          />
        </Field>

        <Field>
          <Label>Email *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="john@gmail.com"
          />
          <p className="mt-2 text-xs text-[var(--color-ink-tertiary)]">
            Existing applicants will be detected automatically.
          </p>
        </Field>

        <Field>
          <Label>Phone number *</Label>
          <Input
            value={formData.phone_number}
            onChange={(e) => updateField("phone_number", e.target.value)}
            placeholder="+91 9876543210"
          />
        </Field>

        <Field>
          <Label>Address</Label>
          <Input
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="City, State"
          />
        </Field>
      </div>

      <div className="rounded-[18px] border border-[rgba(0,113,227,0.16)] bg-[var(--color-brand-soft)] px-5 py-5">
        <h3 className="font-semibold text-[var(--color-brand)]">
          Why do we ask for your email?
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-ink-secondary)]">
          We use your email to check whether you've applied before. If you've
          already applied, we'll automatically load your profile so you don't
          have to enter everything again.
        </p>
      </div>
    </div>
  );
}
