import {User, Mail, Phone, MapPin, Briefcase, Award, IndianRupee, CalendarDays, Linkedin, Github, FileText, CheckCircle2} from "lucide-react";
export default function ReviewStep({formData}) {
  const Item = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 py-4 border-b last:border-b-0">

      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">

        {icon}

      </div>

      <div className="flex-1">

        <p className="text-sm text-gray-500">

          {label}

        </p>

        <p className="font-semibold text-slate-900 mt-1 break-all">

          {value || "-"}

        </p>

      </div>

    </div>
  );

  return (

    <div className="space-y-10">

      {/* Heading */}

      <div>

        <h2 className="text-3xl font-bold">

          Review Your Application

        </h2>

        <p className="text-gray-500 mt-2">

          Please verify all information before submitting.

        </p>

      </div>

      {/* Personal */}

      <div className="bg-white border rounded-3xl p-8 shadow-sm">

        <h3 className="text-2xl font-bold mb-6">

          Personal Information

        </h3>

        <div className="grid md:grid-cols-2 gap-x-10">

          <Item
            icon={<User size={18} />}
            label="Full Name"
            value={formData.full_name}
          />

          <Item
            icon={<Mail size={18} />}
            label="Email"
            value={formData.email}
          />

          <Item
            icon={<Phone size={18} />}
            label="Phone Number"
            value={formData.phone_number}
          />

          <Item
            icon={<MapPin size={18} />}
            label="Address"
            value={formData.address}
          />

        </div>

      </div>

      {/* Professional */}

      <div className="bg-white border rounded-3xl p-8 shadow-sm">

        <h3 className="text-2xl font-bold mb-6">

          Professional Information

        </h3>

        <div className="grid md:grid-cols-2 gap-x-10">

          <Item
            icon={<Award size={18} />}
            label="Experience"
            value={`${formData.years_of_experience || 0} Years`}
          />

          <Item
            icon={<Briefcase size={18} />}
            label="Current Company"
            value={formData.current_company}
          />

          <Item
            icon={<IndianRupee size={18} />}
            label="Current CTC"
            value={formData.current_ctc}
          />

          <Item
            icon={<IndianRupee size={18} />}
            label="Expected CTC"
            value={formData.expected_ctc}
          />

          <Item
            icon={<CalendarDays size={18} />}
            label="Notice Period"
            value={formData.notice_period}
          />

          <Item
            icon={<Linkedin size={18} />}
            label="LinkedIn"
            value={formData.linkedin_url}
          />

          <Item
            icon={<Github size={18} />}
            label="GitHub"
            value={formData.github_url}
          />

        </div>

      </div>

      {/* Resume */}

      <div className="bg-white border rounded-3xl p-8 shadow-sm">

        <h3 className="text-2xl font-bold mb-6">

          Resume

        </h3>

        <div className="flex items-center gap-5">

          <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">

            <FileText size={28} />

          </div>

          <div>

            <h4 className="font-semibold">

              {formData.resume
                ? formData.resume.name
                : "No Resume Uploaded"}

            </h4>

            {formData.resume && (

              <p className="text-gray-500">

                {(formData.resume.size / 1024).toFixed(2)} KB

              </p>

            )}

          </div>

        </div>

      </div>

      {/* Confirmation */}

      <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8">

        <div className="flex gap-5">

          <CheckCircle2
            className="text-blue-700 mt-1"
            size={30}
          />

          <div>

            <h3 className="text-xl font-bold">

              Final Confirmation

            </h3>

            <p className="text-gray-600 mt-3 leading-8">

              By submitting this application, you confirm
              that all information provided is accurate.
              RecruitPro may contact you regarding this
              application using the email address and phone
              number you have provided.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}