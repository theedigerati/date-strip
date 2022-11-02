import { useState, useEffect } from "react";
import { default as dayjs } from "dayjs";

function useDays() {
  const [days, setDays] = useState<dayjs.Dayjs[]>([]);

  useEffect(() => {
    const weekDays = [];
    const firstWeekDay = dayjs().startOf("week");

    for (let i = 0; i <= 6; i++) {
      weekDays.push(dayjs(firstWeekDay).add(i, "days"));
    }
    setDays(weekDays);
  }, []);

  return days;
}

export default useDays;
