import { useState, useCallback } from "react";

export function useDateRange() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleDayClick = useCallback((date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  }, [startDate, endDate]);

  const clearRange = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  }, []);

  const isInRange = useCallback((date: Date) => {
    if (!startDate) return false;
    const end = endDate || hoverDate;
    if (!end) return false;
    const [s, e] = startDate <= end ? [startDate, end] : [end, startDate];
    return date >= s && date <= e;
  }, [startDate, endDate, hoverDate]);

  const isStart = useCallback((date: Date) => startDate?.toDateString() === date.toDateString(), [startDate]);
  const isEnd = useCallback((date: Date) => {
    const end = endDate || hoverDate;
    return end?.toDateString() === date.toDateString();
  }, [endDate, hoverDate]);

  const rangeLength = startDate && endDate
    ? Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1
    : 0;

  return { startDate, endDate, hoverDate, setHoverDate, handleDayClick, clearRange, isInRange, isStart, isEnd, rangeLength };
}
