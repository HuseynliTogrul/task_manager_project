export function normalizeValues<T extends object>(values: T) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()])
  ) as T;
}