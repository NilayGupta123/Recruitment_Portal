import { useState } from "react";
import { useNavigate } from "react-router-dom";

import heroImage from "../../assets/images/hero.png";

import { loginUser, getCurrentUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Step 1: Login
      const loginResponse = await loginUser(
        email,
        password
      );

      const token =
        loginResponse.data.access_token;

      // Step 2: Get Current User
      const meResponse =
        await getCurrentUser(token);

      // Step 3: Save user + token in AuthContext
      login(
        meResponse.data,
        token
      );

      // Step 4: Redirect
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl flex overflow-hidden">

        {/* Left Side */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Recruitment Portal
          </h1>

          <p className="text-gray-500 mb-8">
            Sign in to continue
          </p>

          <form
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

            <p className="text-center text-sm text-blue-600 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          </form>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
          <img
            src={heroImage}
            alt="Recruitment Portal"
            className="max-w-md object-contain"
          />
        </div>

      </div>
    </div>
  );
}