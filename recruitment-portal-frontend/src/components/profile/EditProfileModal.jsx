import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Field, Input, Label } from "../ui/Input";

export default function EditProfileModal({
  isOpen,
  profile,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    user_type: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        user_type: profile.user_type || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      open={isOpen && !!profile}
      onClose={onClose}
      title="Edit profile"
      footer={
        <div className="flex justify-end gap-2.5">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="edit-profile-form">
            Save changes
          </Button>
        </div>
      }
    >
      <form
        id="edit-profile-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Field>
          <Label htmlFor="edit-profile-name">Full name</Label>
          <Input
            id="edit-profile-name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="edit-profile-email">Email</Label>
          <Input
            id="edit-profile-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="edit-profile-phone">Phone number</Label>
          <Input
            id="edit-profile-phone"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <Label htmlFor="edit-profile-role">Role</Label>
          <Input
            id="edit-profile-role"
            type="text"
            value={formData.user_type}
            disabled
            className="bg-[var(--color-canvas)]"
          />
        </Field>
      </form>
    </Modal>
  );
}
