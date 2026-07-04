import { useAuth } from "../../context/AuthContext";

import AdminProfile from "./AdminProfile";
import ApplicantProfile from "./ApplicantProfile";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return user.user_type === "APPLICANT"
    ? <ApplicantProfile />
    : <AdminProfile />;
}