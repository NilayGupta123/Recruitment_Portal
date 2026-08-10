import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../components/public/Navbar";
import Footer from "../../../components/public/Footer";
import Stepper from "../../../components/public/apply/Stepper";
import PersonalInfoStep from "../../../components/public/apply/PersonalInfoStep";
import ProfessionalInfoStep from "../../../components/public/apply/ProfessionalInfoStep";
import ResumeUploadStep from "../../../components/public/apply/ResumeUploadStep";
import ReviewStep from "../../../components/public/apply/ReviewStep";
import { uploadResume, applyJob } from "../../../api/publicApplicantApi";
import Button from "../../../components/ui/Button";

export default function ApplyJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    years_of_experience: "",
    current_company: "",
    current_ctc: "",
    expected_ctc: "",
    notice_period: "",
    linkedin_url: "",
    github_url: "",
    resume: null,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.full_name.trim()) {
          alert("Full Name is required");
          return false;
        }
        if (!formData.email.trim()) {
          alert("Email is required");
          return false;
        }
        if (!formData.phone_number.trim()) {
          alert("Phone Number is required");
          return false;
        }
        return true;
      case 2:
        return true;
      case 3:
        if (!formData.resume) {
          alert("Please upload your resume.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const submitApplication = async () => {
    try {
      setSubmitting(true);

      let resumeFileId = null;

      if (formData.resume) {
        const uploadResponse = await uploadResume(formData.resume);
        resumeFileId = uploadResponse.data.file_id;
      }

      await applyJob({
        job_id: Number(id),
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        years_of_experience: Number(formData.years_of_experience || 0),
        current_company: formData.current_company,
        current_ctc: Number(formData.current_ctc || 0),
        expected_ctc: Number(formData.expected_ctc || 0),
        notice_period: formData.notice_period,
        linkedin_url: formData.linkedin_url,
        github_url: formData.github_url,
        resume_file: resumeFileId,
      });

      navigate("/application-success");
    } catch (err) {
      console.error(err);
      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
        alert(JSON.stringify(err.response.data, null, 2));
      } else {
        alert(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[var(--color-canvas)] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="pressable mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:underline"
          >
            <ArrowLeft size={18} />
            Back to job
          </button>

          <div className="surface-card overflow-hidden">
            <div className="border-b border-[var(--color-line)] px-8 py-8 sm:px-10">
              <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                Apply for this position
              </h1>
              <p className="mt-2 text-[15px] text-[var(--color-ink-secondary)]">
                Complete your application in four simple steps.
              </p>
            </div>

            <Stepper step={step} />

            <div className="px-8 py-8 sm:px-10">
              {step === 1 && (
                <PersonalInfoStep formData={formData} updateField={updateField} />
              )}
              {step === 2 && (
                <ProfessionalInfoStep
                  formData={formData}
                  updateField={updateField}
                />
              )}
              {step === 3 && (
                <ResumeUploadStep formData={formData} updateField={updateField} />
              )}
              {step === 4 && <ReviewStep formData={formData} />}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[var(--color-line)] bg-[var(--color-canvas)] px-8 py-6 sm:px-10">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={step === 1}
              >
                Previous
              </Button>

              {step < 4 ? (
                <Button onClick={nextStep}>Next</Button>
              ) : (
                <Button
                  variant="accent"
                  disabled={submitting}
                  onClick={submitApplication}
                >
                  {submitting ? "Submitting…" : "Submit application"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
