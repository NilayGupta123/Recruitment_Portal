import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../../api/axios";

import ProfileCard from "../../components/profile/ProfileCard";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordCard from "../../components/profile/ChangePasswordCard";
import PageHeader from "../../components/ui/PageHeader";
import Card, { CardBody, CardHeader } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await API.get("/auth/me");
      setProfile(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (data) => {
    try {
      await API.put(`/users/put/${profile.id}`, data);
      toast.success("Profile updated");
      await loadProfile();
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-[var(--color-ink-secondary)]">
        Loading…
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="My profile"
          description="Manage your personal information and account settings."
        />

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-7">
            <ProfileCard
              profile={profile}
              onEdit={() => setShowEditModal(true)}
            />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ChangePasswordCard userId={profile.id} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              Account information
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                  User ID
                </p>
                <p className="mt-1.5 font-semibold text-[var(--color-ink)]">
                  #{profile.id}
                </p>
              </div>
              <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                  Account type
                </p>
                <div className="mt-1.5">
                  <Badge tone="brand">{profile.user_type}</Badge>
                </div>
              </div>
              <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                  Created at
                </p>
                <p className="mt-1.5 font-semibold text-[var(--color-ink)]">
                  {new Date(profile.created_at).toLocaleString()}
                </p>
              </div>
              <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                  Updated at
                </p>
                <p className="mt-1.5 font-semibold text-[var(--color-ink)]">
                  {profile.updated_at
                    ? new Date(profile.updated_at).toLocaleString()
                    : "—"}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        profile={profile}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleProfileUpdate}
      />
    </>
  );
}
