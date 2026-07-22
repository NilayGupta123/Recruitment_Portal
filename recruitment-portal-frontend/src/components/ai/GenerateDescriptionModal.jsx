import { useState } from "react";
import {
  FaMagic,
  FaSyncAlt,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { generateDescription } from "../../api/aiApi";

export default function GenerateDescriptionModal({
  isOpen,
  onClose,
  onReplace,
  entity,
  context,
}) {
  const [additionalPrompt, setAdditionalPrompt] =
    useState("");

  const [generatedDescription, setGeneratedDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res =
        await generateDescription({
          entity,
          context,
          additional_prompt:
            additionalPrompt,
        });

      setGeneratedDescription(
        res.data.description
      );
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.detail ||
          "Failed to generate description."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReplace = () => {
    onReplace(generatedDescription);

    toast.success(
      `${entity} description inserted.`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              ✨ AI {entity} Description Generator
            </h2>

            <p className="text-gray-500 mt-1">
              Generate a professional AI-powered{" "}
              {entity.toLowerCase()} description.
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition"
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="grid grid-cols-2 flex-1 min-h-0">

          {/* Left Panel */}

          <div className="border-r p-6 overflow-y-auto space-y-5 min-h-0">

            {Object.entries(context).map(
              ([key, value]) => (
                <div key={key}>

                  <label className="block text-sm font-medium mb-2">

                    {key
                      .replaceAll("_", " ")
                      .replace(
                        /\b\w/g,
                        (c) => c.toUpperCase()
                      )}

                  </label>

                  <input
                    value={value ?? ""}
                    disabled
                    className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                  />

                </div>
              )
            )}

            <div>

              <label className="block text-sm font-medium mb-2">
                Additional Instructions
              </label>

              <textarea
                rows={8}
                value={additionalPrompt}
                onChange={(e) =>
                  setAdditionalPrompt(
                    e.target.value
                  )
                }
                placeholder={`Example:

• Write in a professional tone

• Keep it concise

• Mention remote work

• Include growth opportunities

• Add any special instructions for this ${entity.toLowerCase()}`}
                className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-violet-500"
              />

            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-3 transition"
            >

              <FaMagic />

              {loading
                ? "Generating..."
                : generatedDescription
                ? `Regenerate ${entity} Description`
                : `Generate ${entity} Description`}

            </button>

          </div>

          {/* Right Panel */}
                    <div className="flex flex-col min-h-0">

            {/* Preview Header */}

            <div className="border-b px-6 py-4">

              <h3 className="text-xl font-bold">
                Generated {entity} Description
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Review the AI generated description before replacing the existing one.
              </p>

            </div>

            {/* Preview */}

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">

              {generatedDescription ? (

                <div className="bg-white border rounded-xl p-6 shadow-sm leading-7 prose max-w-none overflow-auto"
                     dangerouslySetInnerHTML={{
                        __html: generatedDescription,
                    }}
                />

              ) : (

                <div className="h-full flex flex-col justify-center items-center text-center text-gray-400">

                  <FaMagic
                    size={55}
                    className="mb-6 text-violet-400"
                  />

                  <h3 className="text-xl font-semibold text-gray-600">
                    Nothing Generated Yet
                  </h3>

                  <p className="mt-3 max-w-md leading-7">
                    Click{" "}
                    <span className="font-semibold text-violet-600">
                      Generate {entity} Description
                    </span>{" "}
                    to let AI create a professional description based on the information provided.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-5 flex justify-between items-center bg-white">

          <div className="text-sm text-gray-500">

            AI generated descriptions are editable before saving.

          </div>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-lg border hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            {generatedDescription && (

              <>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 text-white flex items-center gap-2 transition"
                >

                  <FaSyncAlt />

                  Regenerate

                </button>

                <button
                  onClick={handleReplace}
                  className="px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 transition"
                >

                  <FaCheck />

                  Replace Description

                </button>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}