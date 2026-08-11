export function scoreTone(score) {
  if (score >= 8) return "high";
  if (score >= 5) return "mid";
  return "low";
}

export function decisionLabel(decision) {
  switch (decision) {
    case "AUTO_ACCEPT":
      return "Strong match";
    case "AUTO_REJECT":
      return "Weak match";
    default:
      return "Needs review";
  }
}

/**
 * Normalize profile AI fields into UI scoreData.
 * Returns null when scoring is not available yet / failed / in progress —
 * the card handles those statuses separately.
 */
export function buildScoreData(profile) {
  if (!profile) return null;

  const status = profile.ai_score_status || profile.aiScoreStatus || null;
  const score = profile.ai_score ?? profile.aiScore;

  if (score == null || (status && status !== "done")) {
    return null;
  }

  return {
    score: Number(score),
    decision: profile.ai_decision ?? profile.aiDecision ?? "REVIEW",
    summary: profile.ai_summary ?? profile.aiSummary ?? "",
    praiseHtml:
      profile.ai_praise_html ??
      profile.praiseHtml ??
      profile.ai?.praiseHtml ??
      "",
    critiqueHtml:
      profile.ai_critique_html ??
      profile.critiqueHtml ??
      profile.ai?.critiqueHtml ??
      "",
    status: status || "done",
  };
}

export function scoreStatusLabel(status) {
  switch (status) {
    case "pending":
    case "processing":
      return "Scoring resume…";
    case "failed":
      return "Score unavailable";
    case "done":
      return "AI score";
    default:
      return "Not scored yet";
  }
}
