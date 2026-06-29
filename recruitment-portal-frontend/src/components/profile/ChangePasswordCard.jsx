import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../api/axios";

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

    if (
      formData.new_password !==
      formData.confirm_password
    ) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.new_password.length < 8) {
      toast.error(
        "Password should be at least 8 characters"
      );
      return;
    }

    try {
      setLoading(true);

      // Replace with your password endpoint
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
    <div className="bg-white rounded-2xl shadow-sm border p-8">

      <div className="flex items-center gap-3 mb-6">

        <FaLock className="text-blue-600 text-xl" />

        <h2 className="text-2xl font-bold text-slate-800">
          Security
        </h2>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Current Password */}

        <div>

          <label className="block mb-2 font-medium">
            Current Password
          </label>

          <div className="relative">

            <input
              type={
                showCurrent ? "text" : "password"
              }
              name="current_password"
              value={formData.current_password}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(!showCurrent)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showCurrent ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

        </div>

        {/* New Password */}

        <div>

          <label className="block mb-2 font-medium">
            New Password
          </label>

          <div className="relative">

            <input
              type={
                showNew ? "text" : "password"
              }
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNew ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

        </div>

        {/* Confirm Password */}

        <div>

          <label className="block mb-2 font-medium">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={
                showConfirm ? "text" : "password"
              }
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-50"
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>

      </form>

    </div>
  );
}