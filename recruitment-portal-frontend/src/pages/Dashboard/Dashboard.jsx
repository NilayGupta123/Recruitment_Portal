import { useAuth } from "../../context/AuthContext";

import AdminDashboard from "./AdminDashboard";
import ApplicantDashboard from "./ApplicantDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return user.user_type === "APPLICANT"
    ? <ApplicantDashboard />
    : <AdminDashboard />;
}