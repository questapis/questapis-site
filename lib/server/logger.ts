type LogLevel = "info" | "warn" | "error";

const SENSITIVE_KEYS = /authorization|cookie|password|secret|token|api[-_]?key/i;

function sanitize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sanitize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        SENSITIVE_KEYS.test(key) ? "[REDACTED]" : sanitize(entry),
      ]),
    );
  }
  return value;
}

export function logServerEvent(
  level: LogLevel,
  event: string,
  context: Record<string, unknown> = {},
) {
  const record = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    event,
    ...(sanitize(context) as Record<string, unknown>),
  });
  if (level === "error") console.error(record);
  else if (level === "warn") console.warn(record);
  else console.info(record);
}
