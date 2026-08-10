import { useState } from "react";
import { Sparkles, RefreshCw, Check } from "lucide-react";
import { toast } from "react-toastify";

import { generateDescription } from "../../api/aiApi";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Field, Input, Label, Textarea } from "../ui/Input";

export default function GenerateDescriptionModal({
  isOpen,
  onClose,
  onReplace,
  entity,
  context,
}) {
  const [additionalPrompt, setAdditionalPrompt] = useState("");
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await generateDescription({
        entity,
        context,
        additional_prompt: additionalPrompt,
      });
      setGeneratedDescription(res.data.description);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.detail || "Failed to generate description."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReplace = () => {
    onReplace(generatedDescription);
    toast.success(`${entity} description inserted.`);
    onClose();
  };

  const handleClose = () => {
    setAdditionalPrompt("");
    setGeneratedDescription("");
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title={`Generate ${entity.toLowerCase()} description`}
      size="full"
      footer={
        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="outline" onClick={handleClose} className="sm:min-w-[100px]">
            Cancel
          </Button>
          {generatedDescription && (
            <>
              <Button
                variant="secondary"
                onClick={handleGenerate}
                disabled={loading}
                className="sm:min-w-[120px]"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                Regenerate
              </Button>
              <Button onClick={handleReplace} className="sm:min-w-[160px]">
                <Check size={16} />
                Use description
              </Button>
            </>
          )}
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6 lg:items-stretch">
        <div className="space-y-4">
          <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              Context
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(context).map(([key, value]) => (
                <Field key={key}>
                  <Label className="mb-1.5 text-[12px]">
                    {key
                      .replaceAll("_", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Label>
                  <Input
                    value={value ?? ""}
                    disabled
                    className="bg-white py-2.5 text-sm"
                  />
                </Field>
              ))}
            </div>
          </div>

          <Field>
            <Label>Additional instructions</Label>
            <Textarea
              rows={4}
              value={additionalPrompt}
              onChange={(e) => setAdditionalPrompt(e.target.value)}
              placeholder="Professional tone, concise, mention remote work…"
              className="min-h-[100px] resize-none"
            />
          </Field>

          <Button
            className="w-full"
            variant="secondary"
            onClick={handleGenerate}
            disabled={loading}
          >
            <Sparkles size={16} />
            {loading
              ? "Generating…"
              : generatedDescription
                ? "Regenerate description"
                : `Generate ${entity.toLowerCase()} description`}
          </Button>
        </div>

        <div className="flex min-h-[240px] flex-col overflow-hidden rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] lg:min-h-0 lg:max-h-[min(52dvh,480px)]">
          <div className="shrink-0 border-b border-[var(--color-line)] px-4 py-3">
            <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              Preview
            </h3>
            <p className="mt-0.5 text-xs text-[var(--color-ink-secondary)]">
              Review before inserting into the form.
            </p>
          </div>
          <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-4">
            {generatedDescription ? (
              <div
                className="prose prose-sm max-w-none rounded-[14px] border border-[var(--color-line)] bg-white p-4 text-[14px] leading-7 text-[var(--color-ink-secondary)]"
                dangerouslySetInnerHTML={{ __html: generatedDescription }}
              />
            ) : (
              <div className="flex h-full min-h-[180px] flex-col items-center justify-center px-4 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                  <Sparkles size={20} />
                </span>
                <h3 className="mt-3 text-base font-semibold text-[var(--color-ink)]">
                  Nothing generated yet
                </h3>
                <p className="mt-1.5 max-w-xs text-sm leading-6 text-[var(--color-ink-secondary)]">
                  Add optional instructions, then generate a description from the job context.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
