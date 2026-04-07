import { motion } from "framer-motion";
import { CalendarDay } from "@/hooks/useCalendar";
import { MonthPalette } from "@/data/monthThemes";
import { HOLIDAYS } from "@/data/holidays";
import { useMemo } from "react";

interface Props {
  day: CalendarDay;
  index: number;
  palette: MonthPalette;
  month: number;
  isStart: boolean;
  isEnd: boolean;
  inRange: boolean;
  hasNote: boolean;
  noteColor?: string;
  onClick: () => void;
  onHover: () => void;
  isDark: boolean;
}

const DayCell = ({ day, index, palette, month, isStart, isEnd, inRange, hasNote, noteColor, onClick, onHover, isDark }: Props) => {
  const holiday = useMemo(() =>
    day.isCurrentMonth ? HOLIDAYS.find(h => h.month === month && h.day === day.day) : null,
  [day, month]);

  const isSelected = isStart || isEnd;
  const bgColor = isSelected
    ? palette.accent
    : inRange
      ? `${palette.accent}26`
      : "transparent";
  const textColor = isSelected
    ? "#fff"
    : !day.isCurrentMonth
      ? (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)")
      : (isDark ? palette.text : "#1a1a1a");

  const rangeBorderRadius = isStart ? "8px 0 0 8px" : isEnd ? "0 8px 8px 0" : (inRange ? "0" : "8px");

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.018, duration: 0.3 }}
      whileHover={{ scale: 1.08, backgroundColor: palette.soft }}
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      onMouseEnter={onHover}
      className="relative flex flex-col items-center justify-center aspect-square cursor-pointer transition-all duration-150"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: rangeBorderRadius,
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: isSelected ? 600 : 400,
        boxShadow: isSelected ? `0 0 0 3px ${palette.accent}4D` : undefined,
      }}>
      {day.day}

      {/* Today sonar */}
      {day.isToday && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="absolute w-8 h-8 rounded-full border-2"
            style={{ borderColor: palette.accent, animation: "sonar 2s ease-out infinite" }} />
        </div>
      )}

      {/* Holiday emoji */}
      {holiday && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 400, damping: 10 }}
          className="absolute -top-1 -right-1 text-[10px]">
          {holiday.emoji}
        </motion.span>
      )}

      {/* Note indicator */}
      {hasNote && (
        <div className="absolute bottom-0.5 right-0.5 w-0 h-0"
          style={{
            borderLeft: "6px solid transparent",
            borderBottom: `6px solid ${noteColor || "#FFF9C4"}`,
          }} />
      )}

      <style>{`
        @keyframes sonar {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 3px ${palette.accent}4D; }
          50% { box-shadow: 0 0 0 6px ${palette.accent}26; }
        }
      `}</style>
    </motion.button>
  );
};

export default DayCell;
