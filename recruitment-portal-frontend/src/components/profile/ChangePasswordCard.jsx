import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "react-toastify";

import API from "../../api/axios";
import Card, { CardBody, CardHeader } from "../ui/Card";
import Button from "../ui/Button";
import { Field, Input, Label } from "../ui/Input";

function PasswordField({
  id,
  label,
  name,
  value,
  onChange,
  show,
  onToggle,
}) {
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="pr-12"
        />
        <button
          type="button"
          onClick={onToggle}
          className="pressable absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-ink-secondary)] hover:bg-black/[0.04]"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </Field>
  );
}

export default function ChangePasswordCard({ userId }) {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.new_password.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      await API.patch(`/users/password/${userId}`, {
        current_password: formData.current_password,
        new_password: formData.new_password,
      });
      toast.success("Password updated successfully");
      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
            <Lock size={16} />
          </span>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            Security
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordField
            id="current-password"
            label="Current password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            show={showCurrent}
            onToggle={() => setShowCurrent(!showCurrent)}
          />
          <PasswordField
            id="new-password"
            label="New password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            show={showNew}
            onToggle={() => setShowNew(!showNew)}
          />
          <PasswordField
            id="confirm-password"
            label="Confirm password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            show={showConfirm}
            onToggle={() => setShowConfirm(!showConfirm)}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating…" : "Update password"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
