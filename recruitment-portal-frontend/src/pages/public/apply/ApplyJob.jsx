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
import {uploadResume, applyJob} from "../../../api/publicApplicantApi";

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

  //---------------------------------------------------
  // Update Form Field
  //---------------------------------------------------

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //---------------------------------------------------
  // Validation
  //---------------------------------------------------

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

  //---------------------------------------------------
  // Next
  //---------------------------------------------------

  const nextStep = () => {
    if (!validateStep()) return;

    setStep((prev) => prev + 1);
  };

  //---------------------------------------------------
  // Previous
  //---------------------------------------------------

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  //---------------------------------------------------
  // Submit
  //---------------------------------------------------

  const submitApplication = async () => {
    try {
      setSubmitting(true);

      let resumeFileId = null;

      //---------------------------------
      // Upload Resume
      //---------------------------------

      if (formData.resume) {
        const uploadResponse = await uploadResume(
          formData.resume
        );

        resumeFileId = uploadResponse.data.file_id;
      }

      //---------------------------------
      // Submit Application
      //---------------------------------

      await applyJob({
        job_id: Number(id),

        full_name: formData.full_name,

        email: formData.email,

        phone_number: formData.phone_number,

        address: formData.address,

        years_of_experience: Number(
          formData.years_of_experience || 0
        ),

        current_company:
          formData.current_company,

        current_ctc: Number(
          formData.current_ctc || 0
        ),

        expected_ctc: Number(
          formData.expected_ctc || 0
        ),

        notice_period:
          formData.notice_period,

        linkedin_url:
          formData.linkedin_url,

        github_url:
          formData.github_url,

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

  //---------------------------------------------------
  // UI
  //---------------------------------------------------

  return (
    <>
      <Navbar />

      <section className="bg-slate-100 min-h-screen py-32">

        <div className="max-w-6xl mx-auto px-6">

          {/* Back */}

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 mb-8"
          >
            <ArrowLeft size={20} />

            Back to Job
          </button>

          {/* Card */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Header */}

            <div className="px-10 py-10 border-b">

              <h1 className="text-4xl font-bold text-slate-900">

                Apply for this Position

              </h1>

              <p className="text-gray-500 mt-3">

                Complete your application in four simple
                steps.

              </p>

            </div>

            {/* Stepper */}

            <Stepper step={step} />

            {/* Form */}

            <div className="p-10">

              {step === 1 && (
                <PersonalInfoStep
                  formData={formData}
                  updateField={updateField}
                />
              )}

              {step === 2 && (
                <ProfessionalInfoStep
                  formData={formData}
                  updateField={updateField}
                />
              )}

              {step === 3 && (
                <ResumeUploadStep
                  formData={formData}
                  updateField={updateField}
                />
              )}

              {step === 4 && (
                <ReviewStep
                  formData={formData}
                />
              )}

            </div>

            {/* Footer Buttons */}

            <div className="border-t bg-slate-50 px-10 py-8 flex justify-between">

              <button
                onClick={previousStep}
                disabled={step === 1}
                className="px-8 py-3 rounded-xl border font-semibold disabled:opacity-40 hover:bg-gray-100 transition"
              >
                Previous
              </button>

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-10 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  disabled={submitting}
                  onClick={submitApplication}
                  className="px-10 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>
              )}

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}