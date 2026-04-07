import { useState, useMemo, useCallback } from "react";

export interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [direction, setDirection] = useState(1);

  const days = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDow = (firstDay.getDay() + 6) % 7; // Monday-based
    const result: CalendarDay[] = [];

    // Previous month padding
    for (let i = startDow - 1; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth, -i);
      result.push({ date: d, day: d.getDate(), isCurrentMonth: false, isToday: false });
    }

    // Current month
    const todayStr = today.toDateString();
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(currentYear, currentMonth, d);
      result.push({ date, day: d, isCurrentMonth: true, isToday: date.toDateString() === todayStr });
    }

    // Next month padding
    const remaining = 42 - result.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(currentYear, currentMonth + 1, d);
      result.push({ date, day: d, isCurrentMonth: false, isToday: false });
    }

    return result;
  }, [currentMonth, currentYear]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentMonth(m => {
      if (m === 11) { setCurrentYear(y => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentMonth(m => {
      if (m === 0) { setCurrentYear(y => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const goToday = useCallback(() => {
    setDirection(today.getMonth() > currentMonth || today.getFullYear() > currentYear ? 1 : -1);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  }, [currentMonth, currentYear, today]);

  return { days, currentMonth, currentYear, direction, goNext, goPrev, goToday };
}
