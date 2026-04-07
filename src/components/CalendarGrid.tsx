import { motion, AnimatePresence } from "framer-motion";
import { CalendarDay } from "@/hooks/useCalendar";
import { MonthTheme } from "@/data/monthThemes";
import DayCell from "./DayCell";

interface Props {
  days: CalendarDay[];
  theme: MonthTheme;
  monthIndex: number;
  isInRange: (d: Date) => boolean;
  isStart: (d: Date) => boolean;
  isEnd: (d: Date) => boolean;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date) => void;
  hasNote: (d: Date) => boolean;
  getNote: (d: Date) => { color: string } | null;
  isDark: boolean;
}

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const CalendarGrid = ({ days, theme, monthIndex, isInRange, isStart, isEnd, onDayClick, onDayHover, hasNote, getNote, isDark }: Props) => {
  const p = theme.palette;
  const headerColor = isDark ? p.text : "#1a1a1a";

  return (
    <div className="px-3 pb-3">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[11px] uppercase tracking-widest py-2 font-medium"
            style={{ color: p.accent, fontFamily: "'Inter', sans-serif" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={monthIndex}
          initial={{ rotateX: 15, y: 40, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: -15, y: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="grid grid-cols-7 gap-[1px]"
          style={{ perspective: "1200px" }}>
          {days.map((day, i) => (
            <DayCell
              key={`${monthIndex}-${i}`}
              day={day}
              index={i}
              palette={p}
              month={monthIndex}
              isStart={isStart(day.date)}
              isEnd={isEnd(day.date)}
              inRange={isInRange(day.date)}
              hasNote={hasNote(day.date)}
              noteColor={getNote(day.date)?.color}
              onClick={() => onDayClick(day.date)}
              onHover={() => onDayHover(day.date)}
              isDark={isDark}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CalendarGrid;
