import { useState } from "react";
import Drawer from "../../ui/Drawer";
import Button from "../../ui/Button";
import { Field, Input, Label, Select } from "../../ui/Input";

export default function CreateUserDrawer({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    user_type: "HR",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      full_name: "",
      email: "",
      password: "",
      phone_number: "",
      user_type: "HR",
    });
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title="Create user"
      subtitle="Add a new portal user"
      width="lg"
      footer={
        <div className="flex gap-2.5">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-user-form"
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Creating…" : "Create user"}
          </Button>
        </div>
      }
    >
      <form id="create-user-form" onSubmit={handleSubmit} className="space-y-5">
        <Field>
          <Label htmlFor="create-user-name">Full name</Label>
          <Input
            id="create-user-name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="create-user-email">Email</Label>
          <Input
            id="create-user-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="create-user-password">Password</Label>
          <Input
            id="create-user-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="create-user-phone">Phone number</Label>
          <Input
            id="create-user-phone"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <Label htmlFor="create-user-role">User role</Label>
          <Select
            id="create-user-role"
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
