/** Only allow same-origin relative paths (open redirects). */
export function safeInternalPath(
  value: string | null,
  fallback: string,
): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }
  return value;
}
