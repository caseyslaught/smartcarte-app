export function getLongMonthName(monthNumber: number) {
  const monthName = new Date(2022, monthNumber, 1).toLocaleString("default", {
    month: "long",
  });

  return monthName;
}
