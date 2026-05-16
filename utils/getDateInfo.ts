export function getDateInfo(): {
  day: string;
  month: string;
  year: number;
  monthName: string;
  weekday: string;
  dateCompleted: string;
} {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const monthName = date.toLocaleString("pt-BR", { month: "long" });

  const weekdayRaw = date.toLocaleString("pt-BR", { weekday: "long" });
  const weekday = weekdayRaw.charAt(0).toUpperCase() + weekdayRaw.slice(1);

  const dateCompleted = `${year}-${month}-${day}`;

  return {
    day,
    month,
    year,
    monthName,
    weekday,
    dateCompleted,
  };
}
