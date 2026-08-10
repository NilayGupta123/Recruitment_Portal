/**
 * Resolve a file URL from the API so relative paths hit the backend,
 * not the Vite dev server origin.
 */
export function resolveFileUrl(url) {
  if (!url) return null;

  const value = String(url).trim();
  if (!value) return null;

  if (/^https?:\/\//i.test(value) || value.startsWith("blob:") || value.startsWith("data:")) {
    return value;
  }

  const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  if (!apiBase) return value;

  if (value.startsWith("/")) {
    return `${apiBase}${value}`;
  }

  return `${apiBase}/${value}`;
}
