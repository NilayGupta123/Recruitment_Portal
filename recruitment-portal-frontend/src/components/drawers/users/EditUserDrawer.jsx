import { useEffect, useState } from "react";
import Drawer from "../../ui/Drawer";
import Button from "../../ui/Button";
import { Field, Input, Label, Select } from "../../ui/Input";

export default function EditUserDrawer({
  isOpen,
  onClose,
  onSubmit,
  user,
  loading,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    user_type: "HR",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        user_type: user.user_type || "HR",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user.id, formData);
  };

  return (
    <Drawer
      open={isOpen && !!user}
      onClose={onClose}
      title="Edit user"
      subtitle={user?.full_name}
      width="lg"
      footer={
        <div className="flex gap-2.5">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-user-form"
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Updating…" : "Update user"}
          </Button>
        </div>
      }
    >
      <form id="edit-user-form" onSubmit={handleSubmit} className="space-y-5">
        <Field>
          <Label htmlFor="edit-user-name">Full name</Label>
          <Input
            id="edit-user-name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="edit-user-email">Email</Label>
          <Input
            id="edit-user-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="edit-user-phone">Phone number</Label>
          <Input
            id="edit-user-phone"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <Label htmlFor="edit-user-role">User role</Label>
          <Select
            id="edit-user-role"
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="HR">HR</option>
            <option value="APPLICANT">APPLICANT</option>
          </Select>
        </Field>
      </form>
    </Drawer>
  );
}
