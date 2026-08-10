import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/hero.png";
import { loginUser, getCurrentUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { Field, Input, Label } from "../../components/ui/Input";
import ThemeToggle from "../../components/ui/ThemeToggle";

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
      const loginResponse = await loginUser(email, password);
      const token = loginResponse.data.access_token;
      // Persist immediately so interceptors and refresh use the new token
      localStorage.setItem("token", token);
      const meResponse = await getCurrentUser(token);
      login(meResponse.data, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-canvas)] px-4 py-10">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--color-brand)_16%,transparent)] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] blur-3xl" />
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-lift)] md:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-10 sm:px-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-sm font-bold text-white">
              RP
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                RecruitPro
              </p>
              <p className="text-xs text-[var(--color-ink-tertiary)]">Sign in to continue</p>
            </div>
          </div>

          <h1 className="text-[34px] font-semibold tracking-[-0.035em] text-[var(--color-ink)]">
            Welcome back
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">
            Access your hiring workspace, track applications, and manage campaigns.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </Field>

            <Field>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </Field>

            {error && (
              <div className="rounded-[14px] border border-[rgba(255,69,58,0.2)] bg-[var(--color-danger-soft)] px-4 py-3 text-sm font-medium text-[var(--color-danger)]">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-ink-secondary)]">
            New here?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[var(--color-brand)] hover:underline"
            >
              Create an account
            </Link>
          </p>
          <p className="mt-3 text-center">
            <Link
              to="/careers"
              className="text-sm font-medium text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)]"
            >
              Browse open roles
            </Link>
          </p>
        </div>

        <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a84ff] via-[#0071e3] to-[#5e5ce6] p-10 md:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_45%)]" />
          <div className="relative z-10 max-w-sm text-center">
            <img
              src={heroImage}
              alt="Recruitment Portal"
              className="mx-auto mb-8 max-w-[280px] object-contain drop-shadow-2xl"
            />
            <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-white">
              Hiring that feels effortless
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              Fluid workflows for recruiters, clear paths for candidates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
