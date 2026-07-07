import { useAuth } from "../../context/AuthContext";

import AdminJobs from "./AdminJobs";
import ApplicantJobs from "./ApplicantJobs";

export default function Jobs() {
  const { user } = useAuth();

  if (!user) return null;

  return user.user_type === "APPLICANT"
    ? <ApplicantJobs />
    : <AdminJobs />;
}