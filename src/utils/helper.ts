import { ChartEntry, DataType, RegisterResponse } from "../types";

export function normalizeValues<T extends object>(values: T) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()])
  ) as T;
}

export function formatChartData(data: RegisterResponse[]): ChartEntry[] {
  return data.map((item: RegisterResponse, index: number) => ({
    name: item.name,
    value: +item.id || index + 1
  }));
}

export function formatData(data: RegisterResponse[]): DataType[] {
  return data.map((user: RegisterResponse, index: number) => ({
    key: `${index + 1}`,
    username: user.username,
    name: `${user.username || ""} ${user.name || ""}`
  }));
}
