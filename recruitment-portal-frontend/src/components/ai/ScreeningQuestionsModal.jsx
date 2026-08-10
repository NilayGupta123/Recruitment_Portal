import { Sparkles } from "lucide-react";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function difficultyTone(difficulty) {
  const value = String(difficulty || "").toLowerCase();
  if (value.includes("hard") || value.includes("senior") || value.includes("advanced")) {
    return "danger";
  }
  if (value.includes("medium") || value.includes("mid") || value.includes("intermediate")) {
    return "accent";
  }
  return "brand";
}

export default function ScreeningQuestionsModal({
  open,
  onClose,
  jobTitle,
  questions = [],
  loading = false,
  onRegenerate,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Screening questions"
      size="lg"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-ink-tertiary)]">
            AI-generated for interview prep
          </p>
          <div className="flex gap-2">
            {onRegenerate && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onRegenerate}
                disabled={loading}
              >
                <Sparkles size={14} />
                {loading ? "Generating…" : "Regenerate"}
              </Button>
            )}
            <Button size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {jobTitle && (
          <div className="rounded-[14px] border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-3.5 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              Role
            </p>
            <p className="mt-1 text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              {jobTitle}
            </p>
          </div>
        )}

        {loading && questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-brand)] border-t-transparent" />
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                Generating questions…
              </p>
              <p className="mt-1 text-xs text-[var(--color-ink-secondary)]">
                This usually takes a few seconds.
              </p>
            </div>
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-[14px] border border-dashed border-[var(--color-line-strong)] px-4 py-12 text-center">
            <p className="text-sm font-semibold text-[var(--color-ink)]">
              No questions yet
            </p>
            <p className="mt-1 text-xs text-[var(--color-ink-secondary)]">
              Generate screening questions for this role.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12px] font-semibold text-[var(--color-ink-secondary)]">
                {questions.length} question{questions.length === 1 ? "" : "s"}
              </p>
              {loading && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-ink-tertiary)]">
                  <span className="h-3 w-3 animate-spin rounded-full border border-[var(--color-brand)] border-t-transparent" />
                  Refreshing…
                </span>
              )}
            </div>

            {questions.map((q, index) => (
              <article
                key={`${q.topic || "q"}-${index}`}
                className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface-muted)] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[12px] font-semibold text-[var(--color-ink-secondary)]">
                    Q{index + 1}
                    {q.topic ? ` · ${q.topic}` : ""}
                  </p>
                  {q.difficulty && (
                    <Badge tone={difficultyTone(q.difficulty)}>
                      {q.difficulty}
                    </Badge>
                  )}
                </div>

                <p className="mt-2.5 text-[15px] font-semibold leading-snug tracking-[-0.015em] text-[var(--color-ink)]">
                  {q.question}
                </p>

                {q.expected_answer && (
                  <div className="mt-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-tertiary)]">
                      Expected answer
                    </p>
                    <p className="mt-1 text-[13px] leading-6 text-[var(--color-ink-secondary)]">
                      {q.expected_answer}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
