import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getCurrentUser } from "../../api/authApi";
import {
  getMyApplicantDetail,
  updateMyApplicantDetail,
} from "../../api/applicantDetailApi";

export default function ApplicantProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });
  

    const [details, setDetails] = useState({
        address: "",
        linkedin_url: "",
        github_url: "",
        years_of_experience: null,
        resume_file: null,
        current_company: "",
        current_ctc: null,
        expected_ctc: null,
        notice_period: null,
    });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const [userRes, detailRes] = await Promise.all([
        getCurrentUser(),
        getMyApplicantDetail(),
      ]);

      setUser(userRes.data);

      setDetails({
        address: detailRes.data.address || "",
        linkedin_url: detailRes.data.linkedin_url || "",
        github_url: detailRes.data.github_url || "",
        years_of_experience:
          detailRes.data.years_of_experience,
        resume_file:
          detailRes.data.resume_file,
        current_company:
          detailRes.data.current_company || "",
        current_ctc:
          detailRes.data.current_ctc,
        expected_ctc:
          detailRes.data.expected_ctc,
        notice_period:
          detailRes.data.notice_period,
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

    const saveProfile = async () => {
    try {
        setSaving(true);

        await updateMyApplicantDetail(details);

        toast.success("Profile updated successfully.");
    } catch (err) {
        console.error(err);

        toast.error(
        err?.response?.data?.detail ||
        "Unable to update profile."
        );
    } finally {
        setSaving(false);
    }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your personal and professional information.
        </p>
      </div>

      {/* Personal Information */}

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-bold mb-6">
          Personal Information
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
            value={user.full_name}
            disabled
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
            value={user.email}
            disabled
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
            value={user.phone_number}
            disabled
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Address
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3"
              value={details.address}
              onChange={(e) =>
                setDetails({
                  ...details,
                  address: e.target.value,
                })
              }
            />
          </div>

        </div>

      </div>

      {/* Professional Information */}

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-bold mb-6">
          Professional Information
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Current Company
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3"
              value={details.current_company}
              onChange={(e) =>
                setDetails({
                  ...details,
                  current_company:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Years of Experience
            </label>

            <input
              type="number"
              className="w-full border rounded-lg px-4 py-3"
              value={details.years_of_experience}
                onChange={(e) =>
                setDetails({
                    ...details,
                    years_of_experience:
                    e.target.value === ""
                        ? null
                        : Number(e.target.value),
                })
                }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Current CTC
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3"
              value={details.current_ctc}
              onChange={(e) =>
                setDetails({
                  ...details,
                  current_ctc:
                    e.target.value === ""
                      ? null
                      : Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Expected CTC
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3"
              value={details.expected_ctc}
              onChange={(e) =>
                setDetails({
                  ...details,
                  expected_ctc:
                    e.target.value === ""
                      ? null
                      : Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Notice Period
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3"
              value={details.notice_period}
              onChange={(e) =>
                setDetails({
                  ...details,
                  notice_period:
                    e.target.value === ""
                      ? null
                      : Number(e.target.value),
                })
              }
            />
          </div>

        </div>

      </div>

      {/* Professional Links */}

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-bold mb-6">
          Professional Links
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              LinkedIn
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3"
              value={details.linkedin_url}
              onChange={(e) =>
                setDetails({
                  ...details,
                  linkedin_url:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              GitHub
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3"
              value={details.github_url}
              onChange={(e) =>
                setDetails({
                  ...details,
                  github_url:
                    e.target.value,
                })
              }
            />
          </div>

        </div>

      </div>

      {/* Resume */}

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-bold mb-4">
          Resume
        </h2>

        <input
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Resume File ID"
          value={details.resume_file}
          onChange={(e) =>
            setDetails({
              ...details,
              resume_file:
                e.target.value,
            })
          }
        />

        <p className="text-gray-500 text-sm mt-2">
          Resume upload integration will be added later.
        </p>

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button
          onClick={saveProfile}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold disabled:bg-gray-400"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </div>
  );
}