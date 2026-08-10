import { useAuth } from "../../../context/AuthContext";
import Drawer from "../../ui/Drawer";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";

function Detail({ label, children }) {
  return (
    <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
        {label}
      </p>
      <div className="mt-1.5 text-[15px] font-medium text-[var(--color-ink)]">
        {children}
      </div>
    </div>
  );
}

const roleTone = {
  ADMIN: "danger",
  HR: "success",
  APPLICANT: "brand",
};

export default function UserDrawer({ user, onClose, onEdit }) {
  const { user: currentUser } = useAuth();

  return (
    <Drawer
      open={!!user}
      onClose={onClose}
      title="User details"
      subtitle={user?.full_name}
      footer={
        currentUser?.user_type === "ADMIN" ? (
          <Button className="w-full" onClick={() => onEdit(user)}>
            Edit user
          </Button>
        ) : null
      }
    >
      {user && (
        <div className="space-y-4">
          <Detail label="Full name">{user.full_name}</Detail>
          <Detail label="Email">{user.email}</Detail>
          <Detail label="Phone number">{user.phone_number || "—"}</Detail>
          <Detail label="Role">
            <Badge tone={roleTone[user.user_type] || "default"}>
              {user.user_type}
            </Badge>
          </Detail>
        </div>
      )}
    </Drawer>
  );
}
