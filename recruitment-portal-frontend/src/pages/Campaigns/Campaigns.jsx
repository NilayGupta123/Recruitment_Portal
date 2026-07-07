import { useAuth } from "../../context/AuthContext";

import AdminCampaigns from "./AdminCampaigns";
import ApplicantCampaigns from "./ApplicantCampaigns";

export default function Campaigns() {
  const { user } = useAuth();

  if (!user) return null;

  return user.user_type === "APPLICANT"
    ? <ApplicantCampaigns />
    : <AdminCampaigns />;
}