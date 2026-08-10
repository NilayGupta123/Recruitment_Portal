import Card, { CardBody, CardHeader } from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";

const roleTone = {
  ADMIN: "danger",
  HR: "success",
  APPLICANT: "brand",
};

export default function ProfileCard({ profile, onEdit }) {
  if (!profile) return null;

  return (
    <Card className="h-full">
      <CardHeader>
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
          Personal information
        </h2>
        <Button size="sm" onClick={onEdit}>
          Edit profile
        </Button>
      </CardHeader>
      <CardBody>
        <div className="flex items-center gap-5">
          <Avatar name={profile.full_name} size="lg" className="h-20 w-20 text-xl" />
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              {profile.full_name}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
              {profile.user_type}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              Email
            </p>
            <p className="mt-1.5 break-all font-semibold text-[var(--color-ink)]">
              {profile.email}
            </p>
          </div>
          <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              Phone
            </p>
            <p className="mt-1.5 font-semibold text-[var(--color-ink)]">
              {profile.phone_number || "—"}
            </p>
          </div>
          <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              Role
            </p>
            <div className="mt-1.5">
              <Badge tone={roleTone[profile.user_type] || "default"}>
                {profile.user_type}
              </Badge>
            </div>
          </div>
          <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              User ID
            </p>
            <p className="mt-1.5 font-semibold text-[var(--color-ink)]">
              #{profile.id}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
