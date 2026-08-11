import { Sparkles, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { cn } from "../ui/cn";
import { scoreTone, scoreStatusLabel } from "./aiScoreUtils";

const toneDot = {
  high: "bg-[var(--color-success)]",
  mid: "bg-[var(--color-accent)]",
  low: "bg-[var(--color-danger)]",
};

const toneText = {
  high: "text-[var(--badge-success-fg)]",
  mid: "text-[var(--badge-accent-fg)]",
  low: "text-[var(--badge-danger-fg)]",
};

export default function AiScoreCard({ scoreData, status, onOpen }) {
  const scoring =
    status === "pending" || status === "processing";
  const failed = status === "failed";
  const ready = Boolean(scoreData) && (!status || status === "done");

  if (scoring) {
    return (
      <div
        className={cn(
          "flex w-full items-center gap-3 rounded-[14px] border border-[var(--color-line)]",
          "bg-[var(--color-surface-muted)] px-3 py-2.5"
        )}
      >
        <div className="flex h-9 min-w-[3.25rem] shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] ring-1 ring-inset ring-[var(--color-line)]">
          <Loader2
            size={16}
            className="animate-spin text-[var(--color-brand)]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-[var(--color-ink-tertiary)]" />
            <span className="truncate text-[12px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
              {scoreStatusLabel(status)}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-[var(--color-ink-tertiary)]">
            AI is reviewing the resume
          </p>
        </div>
      </div>
    );
  }

  if (failed || !ready) {
    return (
      <div
        className={cn(
          "flex w-full items-center gap-3 rounded-[14px] border border-[var(--color-line)]",
          "bg-[var(--color-surface-muted)] px-3 py-2.5"
        )}
      >
        <div className="flex h-9 min-w-[3.25rem] shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] ring-1 ring-inset ring-[var(--color-line)]">
          <AlertCircle
            size={16}
            className={
              failed
                ? "text-[var(--color-danger)]"
                : "text-[var(--color-ink-tertiary)]"
            }
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="truncate text-[12px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
            {scoreStatusLabel(failed ? "failed" : status)}
          </span>
          <p className="mt-0.5 truncate text-[11px] text-[var(--color-ink-tertiary)]">
            {failed
              ? "Scoring could not be completed"
              : "Score appears after apply"}
          </p>
        </div>
      </div>
    );
  }

  const score = Number(scoreData.score) || 0;
  const tone = scoreTone(score);
  const display = score % 1 === 0 ? score.toFixed(0) : score.toFixed(1);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "pressable flex w-full items-center gap-3 rounded-[14px] border border-[var(--color-line)]",
        "bg-[var(--color-surface-muted)] px-3 py-2.5 text-left",
        "transition hover:border-[var(--color-line-strong)] hover:bg-[var(--color-fill)]"
      )}
    >
      <div
        className={cn(
          "flex h-9 min-w-[3.25rem] shrink-0 items-center justify-center gap-0.5 rounded-lg px-2",
          "bg-[var(--color-surface)] ring-1 ring-inset ring-[var(--color-line)]"
        )}
      >
        <span
          className={cn(
            "inline-flex items-center text-[16px] font-bold leading-none tracking-[-0.03em] tabular-nums",
            toneText[tone]
          )}
        >
          {display}
          <span className="ml-0.5 text-[10px] font-semibold text-[var(--color-ink-tertiary)]">
            /10
          </span>
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", toneDot[tone])} />
          <span className="truncate text-[12px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
            AI score
          </span>
          <Sparkles size={12} className="shrink-0 text-[var(--color-ink-tertiary)]" />
        </div>
        <p className="mt-0.5 truncate text-[11px] text-[var(--color-ink-tertiary)]">
          Tap for rationale
        </p>
      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-[var(--color-ink-tertiary)]"
      />
    </button>
  );
}
