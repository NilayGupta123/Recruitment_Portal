import { useRef } from "react";
import {UploadCloud, FileText, CheckCircle2, Trash2, Info} from "lucide-react";
export default function ResumeUploadStep({formData, updateField}) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      updateField("resume", file);
    }
  };

  const removeResume = () => {
    updateField("resume", null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-10">

      {/* Heading */}

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          Resume Upload
        </h2>

        <p className="text-gray-500 mt-2">
          Upload your latest resume to continue.
        </p>

      </div>

      {/* Upload Box */}

      <div
        onClick={() => inputRef.current.click()}
        className="cursor-pointer border-2 border-dashed border-blue-300 rounded-3xl bg-blue-50 hover:bg-blue-100 transition p-14 text-center"
      >

        <UploadCloud
          className="mx-auto text-blue-700"
          size={70}
        />

        <h3 className="mt-6 text-2xl font-bold">

          Drag & Drop Resume

        </h3>

        <p className="text-gray-500 mt-3">

          or click to browse

        </p>

        <p className="text-sm text-gray-400 mt-6">

          PDF • DOC • DOCX

          <br />

          Maximum Size: 5 MB

        </p>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

      </div>

      {/* Uploaded Resume */}

      {formData.resume && (

        <div className="bg-green-50 border border-green-200 rounded-3xl p-8">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center">

                <FileText
                  className="text-white"
                  size={32}
                />

              </div>

              <div>

                <h3 className="font-bold text-lg">

                  {formData.resume.name}

                </h3>

                <p className="text-gray-500">

                  {(formData.resume.size / 1024).toFixed(1)} KB

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <button
                onClick={removeResume}
                className="text-red-500 hover:text-red-700"
              >

                <Trash2 size={22} />

              </button>

            </div>

          </div>

        </div>

      )}

      {/* Tips */}

      <div className="bg-orange-50 border border-orange-200 rounded-3xl p-8">

        <div className="flex gap-4">

          <Info
            className="text-orange-500 mt-1"
            size={24}
          />

          <div>

            <h3 className="font-bold text-lg">

              Resume Tips

            </h3>

            <ul className="mt-4 space-y-3 text-gray-700">

              <li>
                • Keep your resume to one or two pages.
              </li>

              <li>
                • Highlight measurable achievements.
              </li>

              <li>
                • Mention relevant technologies.
              </li>

              <li>
                • Keep formatting clean and readable.
              </li>

              <li>
                • Upload the latest version.
              </li>

            </ul>

          </div>

        </div>

      </div>

      {/* ATS Score Placeholder */}

      <div className="rounded-3xl bg-slate-100 p-8">

        <h3 className="text-xl font-bold">

          Resume Analysis

        </h3>

        <p className="text-gray-500 mt-3">

          After uploading your resume, RecruitPro will
          automatically analyze your resume and compare
          it with the job requirements.

        </p>

        <div className="mt-8">

          <div className="flex justify-between mb-2">

            <span>Resume Match</span>

            <span className="font-semibold">

              Coming Soon

            </span>

          </div>

          <div className="h-3 rounded-full bg-gray-300 overflow-hidden">

            <div className="w-0 h-full bg-green-500 rounded-full"></div>

          </div>

        </div>

      </div>

    </div>
  );
}