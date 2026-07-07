import {Briefcase, Award, IndianRupee, CalendarDays, Linkedin,Github} from "lucide-react";
export default function ProfessionalInfoStep({formData, updateField}) {
  return (
    <div className="space-y-10">

      {/* Header */}

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          Professional Information
        </h2>

        <p className="text-gray-500 mt-2">
          Help us understand your professional background.
        </p>

      </div>

      {/* Experience */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Experience */}

        <div>

          <label className="font-semibold text-sm">
            Years of Experience
          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <Award
              size={20}
              className="text-gray-400"
            />

            <input
              type="number"
              min="0"
              value={formData.years_of_experience}
              onChange={(e) =>
                updateField(
                  "years_of_experience",
                  e.target.value
                )
              }
              className="ml-3 w-full outline-none"
              placeholder="3"
            />

          </div>

        </div>

        {/* Company */}

        <div>

          <label className="font-semibold text-sm">
            Current Company
          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <Briefcase
              size={20}
              className="text-gray-400"
            />

            <input
              value={formData.current_company}
              onChange={(e) =>
                updateField(
                  "current_company",
                  e.target.value
                )
              }
              className="ml-3 w-full outline-none"
              placeholder="Google"
            />

          </div>

        </div>

        {/* Current CTC */}

        <div>

          <label className="font-semibold text-sm">
            Current CTC (LPA)
          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <IndianRupee
              size={20}
              className="text-gray-400"
            />

            <input
              type="number"
              value={formData.current_ctc}
              onChange={(e) =>
                updateField(
                  "current_ctc",
                  e.target.value
                )
              }
              className="ml-3 w-full outline-none"
              placeholder="8"
            />

          </div>

        </div>

        {/* Expected */}

        <div>

          <label className="font-semibold text-sm">
            Expected CTC (LPA)
          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <IndianRupee
              size={20}
              className="text-gray-400"
            />

            <input
              type="number"
              value={formData.expected_ctc}
              onChange={(e) =>
                updateField(
                  "expected_ctc",
                  e.target.value
                )
              }
              className="ml-3 w-full outline-none"
              placeholder="12"
            />

          </div>

        </div>

        {/* Notice */}

        <div>

          <label className="font-semibold text-sm">
            Notice Period
          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <CalendarDays
              size={20}
              className="text-gray-400"
            />

            <select
            value={formData.notice_period}
            onChange={(e) =>
                updateField("notice_period", Number(e.target.value))
            }
            >
            <option value="">Select</option>
            <option value={0}>Immediate</option>
            <option value={15}>15 Days</option>
            <option value={30}>30 Days</option>
            <option value={60}>60 Days</option>
            <option value={90}>90 Days</option>
            </select>

          </div>

        </div>

      </div>

      {/* Links */}

      <div className="border-t pt-10">

        <h3 className="text-2xl font-bold mb-8">

          Professional Links

        </h3>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LinkedIn */}

          <div>

            <label className="font-semibold text-sm">
              LinkedIn Profile
            </label>

            <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

              <Linkedin
                size={20}
                className="text-blue-700"
              />

              <input
                value={formData.linkedin_url}
                onChange={(e) =>
                  updateField(
                    "linkedin_url",
                    e.target.value
                  )
                }
                className="ml-3 w-full outline-none"
                placeholder="https://linkedin.com/in/..."
              />

            </div>

          </div>

          {/* GitHub */}

          <div>

            <label className="font-semibold text-sm">
              GitHub Profile
            </label>

            <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

              <Github
                size={20}
                className="text-slate-700"
              />

              <input
                value={formData.github_url}
                onChange={(e) =>
                  updateField(
                    "github_url",
                    e.target.value
                  )
                }
                className="ml-3 w-full outline-none"
                placeholder="https://github.com/..."
              />

            </div>

          </div>

        </div>

      </div>

      {/* Tips */}

      <div className="rounded-2xl bg-orange-50 border border-orange-200 p-6">

        <h3 className="font-semibold text-orange-700">

          🚀 Profile Tips

        </h3>

        <ul className="mt-4 space-y-2 text-gray-700">

          <li>• Keep your LinkedIn profile updated.</li>

          <li>• Add your GitHub if you have personal projects.</li>

          <li>• Mention accurate salary expectations.</li>

          <li>• Be honest about your notice period.</li>

        </ul>

      </div>

    </div>
  );
}