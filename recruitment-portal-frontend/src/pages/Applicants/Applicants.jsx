import { useAuth } from "../../context/AuthContext";

import ApplicantManagement from "./ApplicantManagement";
import MyApplications from "./MyApplications";

export default function Applicants() {
  const { user } = useAuth();

  if (!user) return null;

  return user.user_type === "APPLICANT"
    ? <MyApplications />
    : <ApplicantManagement />;
}