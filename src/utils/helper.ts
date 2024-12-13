import { ChartEntry, RegisterResponse } from "../types";

export function normalizeValues<T extends object>(values: T) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()])
  ) as T;
}

export function formatChartData(
  data: RegisterResponse[]
): ChartEntry[] {
  return data.map((item: RegisterResponse, index: number) => ({
    name: item.name,
    value: +item.id || index + 1
  }));
}
