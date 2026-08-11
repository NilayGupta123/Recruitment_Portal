import { Sparkles, ThumbsUp, MessageSquareWarning } from "lucide-react";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import { decisionLabel, scoreTone } from "./aiScoreUtils";

function HtmlBlock({ html }) {
  if (!html) {
    return (
      <p className="text-sm text-[var(--color-ink-secondary)]">
        No details available yet.
      </p>
    );
  }

  return (
    <div
      className="ai-rationale prose prose-sm max-w-none text-[14px] leading-7 text-[var(--color-ink-secondary)]
        prose-headings:text-[var(--color-ink)] prose-strong:text-[var(--color-ink)]
        prose-li:marker:text-[var(--color-brand)] prose-ul:my-2 prose-li:my-1"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function AiScoreModal({ open, onClose, scoreData, candidateName }) {
  if (!scoreData) return null;

  const score = Number(scoreData.score) || 0;
  const tone = scoreTone(score);
  const toneBadge =
    tone === "high" ? "success" : tone === "mid" ? "accent" : "danger";
  const display = score % 1 === 0 ? score.toFixed(0) : score.toFixed(1);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="AI evaluation"
      size="lg"
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="pressable rounded-full bg-[var(--color-fill)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-fill-strong)]"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-4 py-3.5">
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-bold leading-none tracking-[-0.04em] text-[var(--color-ink)]">
              {display}
            </span>
            <span className="text-sm font-semibold text-[var(--color-ink-tertiary)]">
              /10
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                <Sparkles size={12} />
                Match score
              </span>
              <Badge tone={toneBadge}>{decisionLabel(scoreData.decision)}</Badge>
            </div>
            {candidateName && (
              <p className="mt-1 truncate text-sm text-[var(--color-ink-secondary)]">
                {candidateName}
              </p>
            )}
          </div>
        </div>

        {scoreData.summary && (
          <p className="text-sm leading-6 text-[var(--color-ink-secondary)]">
            {scoreData.summary}
          </p>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          <section className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--badge-success-bg)] text-[var(--badge-success-fg)]">
                <ThumbsUp size={14} />
              </span>
              <h3 className="text-sm font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                Praise
              </h3>
            </div>
            <HtmlBlock html={scoreData.praiseHtml} />
          </section>

          <section className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--badge-accent-bg)] text-[var(--badge-accent-fg)]">
                <MessageSquareWarning size={14} />
              </span>
              <h3 className="text-sm font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                Critique
              </h3>
            </div>
            <HtmlBlock html={scoreData.critiqueHtml} />
          </section>
        </div>
      </div>
    </Modal>
  );
}
