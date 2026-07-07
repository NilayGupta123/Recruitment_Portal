import { useEffect, useState } from "react";

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

  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            Edit Profile
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Read Only */}

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <input
              type="text"
              value={formData.user_type}
              disabled
              className="w-full bg-gray-100 border rounded-xl px-4 py-3 cursor-not-allowed"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}