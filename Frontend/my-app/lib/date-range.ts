
export function getMonthRange(month: string): { startDate: string; endDate: string } {
  const now = new Date();
  const offset = month === "last-month" ? 1 : 0;

  const start = new Date(now.getFullYear(), now.getMonth() - offset, 1);
  const end = new Date(now.getFullYear(), now.getMonth() - offset + 1, 0, 23, 59, 59, 999);

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}