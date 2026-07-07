import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { signup } from "../../../api/authApi";

export default function SignupForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordStrength = () => {
    let score = 0;

    if (formData.password.length >= 8) score++;
    if (/[A-Z]/.test(formData.password)) score++;
    if (/[0-9]/.test(formData.password)) score++;
    if (/[^A-Za-z0-9]/.test(formData.password)) score++;

    return score;
  };

  const strength = passwordStrength();

  const getStrengthText = () => {
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !== formData.confirm_password
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await signup({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.detail ||
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-10">

      <h2 className="text-3xl font-bold mb-8">
        Create Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Name */}

        <div>

          <label className="block font-medium mb-2">

            Full Name

          </label>

          <div className="relative">

            <User
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              type="text"
              name="full_name"
              required
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="block font-medium mb-2">

            Email

          </label>

          <div className="relative">

            <Mail
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="block font-medium mb-2">

            Password

          </label>

          <div className="relative">

            <Lock
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Password Strength */}

          <div className="mt-3 flex items-center gap-2">

            {strength >= 3 ? (
              <CheckCircle
                className="text-green-600"
                size={18}
              />
            ) : (
              <XCircle
                className="text-red-500"
                size={18}
              />
            )}

            <span className="text-sm">

              Password Strength:{" "}
              <strong>{getStrengthText()}</strong>

            </span>

          </div>

        </div>

        {/* Confirm Password */}

        <div>

          <label className="block font-medium mb-2">

            Confirm Password

          </label>

          <div className="relative">

            <Lock
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirm_password"
              required
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-4"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Submit */}

        <button
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3 disabled:opacity-50"
        >

          {loading ? (
            <>
              <Loader2
                className="animate-spin"
                size={20}
              />

              Creating Account...

            </>
          ) : (
            "Create Account"
          )}

        </button>

      </form>

      <div className="mt-8 text-center text-gray-600">

        Already have an account?{" "}

        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>

      </div>

    </div>
  );
}