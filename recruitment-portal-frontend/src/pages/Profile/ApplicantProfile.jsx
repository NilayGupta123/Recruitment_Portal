import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getCurrentUser } from "../../api/authApi";
import {
  getMyApplicantDetail,
  updateMyApplicantDetail,
} from "../../api/applicantDetailApi";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Card, { CardBody, CardHeader } from "../../components/ui/Card";
import { Field, Input, Label } from "../../components/ui/Input";

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
        years_of_experience: detailRes.data.years_of_experience,
        resume_file: detailRes.data.resume_file,
        current_company: detailRes.data.current_company || "",
        current_ctc: detailRes.data.current_ctc,
        expected_ctc: detailRes.data.expected_ctc,
        notice_period: detailRes.data.notice_period,
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
        err?.response?.data?.detail || "Unable to update profile."
      );
    } finally {
      setSaving(false);
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
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="My profile"
        description="Manage your personal and professional information."
        actions={
          <Button onClick={saveProfile} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            Personal information
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label>Full name</Label>
              <Input value={user.full_name} disabled className="bg-[var(--color-canvas)]" />
            </Field>
            <Field>
              <Label>Email</Label>
              <Input value={user.email} disabled className="bg-[var(--color-canvas)]" />
            </Field>
            <Field>
              <Label>Phone number</Label>
              <Input
                value={user.phone_number}
                disabled
                className="bg-[var(--color-canvas)]"
              />
            </Field>
            <Field>
              <Label>Address</Label>
              <Input
                value={details.address}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    address: e.target.value,
                  })
                }
              />
            </Field>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            Professional information
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label>Current company</Label>
              <Input
                value={details.current_company}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    current_company: e.target.value,
                  })
                }
              />
            </Field>
            <Field>
              <Label>Years of experience</Label>
              <Input
                type="number"
                value={details.years_of_experience ?? ""}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    years_of_experience:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </Field>
            <Field>
              <Label>Current CTC</Label>
              <Input
                value={details.current_ctc ?? ""}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    current_ctc:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </Field>
            <Field>
              <Label>Expected CTC</Label>
              <Input
                value={details.expected_ctc ?? ""}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    expected_ctc:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </Field>
            <Field>
              <Label>Notice period</Label>
              <Input
                value={details.notice_period ?? ""}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    notice_period:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </Field>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            Professional links
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label>LinkedIn</Label>
              <Input
                value={details.linkedin_url}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    linkedin_url: e.target.value,
                  })
                }
              />
            </Field>
            <Field>
              <Label>GitHub</Label>
              <Input
                value={details.github_url}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    github_url: e.target.value,
                  })
                }
              />
            </Field>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            Resume
          </h2>
        </CardHeader>
        <CardBody>
          <Field>
            <Label>Resume file ID</Label>
            <Input
              placeholder="Resume file ID"
              value={details.resume_file ?? ""}
              onChange={(e) =>
                setDetails({
                  ...details,
                  resume_file: e.target.value,
                })
              }
            />
          </Field>
          <p className="mt-2 text-sm text-[var(--color-ink-secondary)]">
            Resume upload integration will be added later.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
