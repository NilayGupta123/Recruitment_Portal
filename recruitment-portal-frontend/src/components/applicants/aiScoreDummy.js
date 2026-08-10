/**
 * Dummy AI score payload until the backend wires real scoring.
 * Shape is intentionally stable for future API integration:
 * {
 *   score: number (0–10),
 *   decision: "AUTO_ACCEPT" | "REVIEW" | "AUTO_REJECT",
 *   praiseHtml: string,   // HTML from AI
 *   critiqueHtml: string, // HTML from AI
 * }
 */
export function getDummyAiScore(profile) {
  const seed =
    Number(profile?.application_id) ||
    Number(profile?.job_id) ||
    Number(profile?.user?.id) ||
    7;

  const score = Math.round(((seed * 1.7) % 4.5) + 5.2); // ~5–9
  const clamped = Math.min(10, Math.max(0, score));

  let decision = "REVIEW";
  if (clamped >= 8) decision = "AUTO_ACCEPT";
  if (clamped <= 3) decision = "AUTO_REJECT";

  const name = profile?.user?.full_name || "This candidate";
  const first = name.split(" ")[0];

  return {
    score: clamped,
    decision,
    summary: `${first} shows a solid overall fit for this role based on experience and skills alignment.`,
    praiseHtml: `
      <ul>
        <li><strong>Relevant experience</strong> — hands-on delivery in similar product environments.</li>
        <li><strong>Skill overlap</strong> — core stack matches the role’s primary requirements.</li>
        <li><strong>Communication</strong> — resume is clear, structured, and outcome-focused.</li>
        <li><strong>Growth signals</strong> — progressive ownership across recent roles.</li>
      </ul>
    `,
    critiqueHtml: `
      <ul>
        <li><strong>Depth gaps</strong> — limited evidence of large-scale system ownership.</li>
        <li><strong>Missing keywords</strong> — a few preferred tools are not explicitly listed.</li>
        <li><strong>Impact metrics</strong> — some achievements lack quantified results.</li>
        <li><strong>Domain exposure</strong> — industry-specific experience could be stronger.</li>
      </ul>
    `,
  };
}

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
