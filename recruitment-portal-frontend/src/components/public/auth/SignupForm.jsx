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
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import { Field, Input, Label } from "../../ui/Input";

export default function SignupForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if (!formData.password) return "Enter a password";
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
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
      alert(err.response?.data?.detail || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-7 sm:p-9">
      <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--color-ink)]">
        Create account
      </h2>
      <p className="mt-2 text-sm text-[var(--color-ink-secondary)]">
        A few details and you’re in.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <Field>
          <Label htmlFor="full_name">Full name</Label>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-tertiary)]"
              size={18}
            />
            <Input
              id="full_name"
              type="text"
              name="full_name"
              required
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="pl-11"
            />
          </div>
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-tertiary)]"
              size={18}
            />
            <Input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="pl-11"
            />
          </div>
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-tertiary)]"
              size={18}
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="px-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[var(--color-ink-tertiary)] hover:bg-black/[0.04]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-sm text-[var(--color-ink-secondary)]">
            {strength >= 3 ? (
              <CheckCircle className="text-[var(--color-success)]" size={16} />
            ) : (
              <XCircle className="text-[var(--color-danger)]" size={16} />
            )}
            <span>
              Strength: <strong className="text-[var(--color-ink)]">{getStrengthText()}</strong>
            </span>
          </div>
        </Field>

        <Field>
          <Label htmlFor="confirm_password">Confirm password</Label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-tertiary)]"
              size={18}
            />
            <Input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              required
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="••••••••"
              className="px-11"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[var(--color-ink-tertiary)] hover:bg-black/[0.04]"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>

        <Button type="submit" variant="accent" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-[var(--color-ink-secondary)]">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-[var(--color-brand)] hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
