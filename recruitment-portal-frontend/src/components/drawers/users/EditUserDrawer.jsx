import { useEffect, useState } from "react";

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

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[650px] h-full bg-white shadow-xl overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            Edit User
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
              className="w-full border rounded-xl px-4 py-3"
              required
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
              className="w-full border rounded-xl px-4 py-3"
              required
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
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              User Role
            </label>

            <select
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="ADMIN">
                ADMIN
              </option>

              <option value="HR">
                HR
              </option>

              <option value="APPLICANT">
                APPLICANT
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update User"}
          </button>

        </form>

      </div>
    </div>
  );
}