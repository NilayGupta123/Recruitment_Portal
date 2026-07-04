import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../../api/axios";

import ProfileCard from "../../components/profile/ProfileCard";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordCard from "../../components/profile/ChangePasswordCard";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] =
    useState(false);

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
      await API.put(
        `/users/put/${profile.id}`,
        data
      );

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
      <div className="flex items-center justify-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        {/* Page Header */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            My Profile
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your personal information and account settings.
          </p>

        </div>

        {/* Top Cards */}

        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-7">

            <ProfileCard
              profile={profile}
              onEdit={() =>
                setShowEditModal(true)
              }
            />

          </div>

          <div className="col-span-5">

            <ChangePasswordCard
              userId={profile.id}
            />

          </div>

        </div>

        {/* Account Information */}

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Account Information
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <p className="text-gray-500 text-sm">
                User ID
              </p>

              <p className="font-semibold mt-1">
                #{profile.id}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Account Type
              </p>

              <p className="font-semibold mt-1">
                {profile.user_type}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Created At
              </p>

              <p className="font-semibold mt-1">
                {new Date(
                  profile.created_at
                ).toLocaleString()}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Updated At
              </p>

              <p className="font-semibold mt-1">
                {profile.updated_at
                  ? new Date(
                      profile.updated_at
                    ).toLocaleString()
                  : "-"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Edit Profile */}

      <EditProfileModal
        isOpen={showEditModal}
        profile={profile}
        onClose={() =>
          setShowEditModal(false)
        }
        onSubmit={handleProfileUpdate}
      />

    </>
  );
}