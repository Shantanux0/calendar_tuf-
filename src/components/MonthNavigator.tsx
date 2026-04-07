import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonthTheme } from "@/data/monthThemes";

interface Props {
  theme: MonthTheme;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  isDark: boolean;
}

const MonthNavigator = ({ theme, year, onPrev, onNext, onToday, isDark }: Props) => {
  const textColor = isDark ? theme.palette.text : "#1a1a1a";
  const subColor = isDark ? `${theme.palette.text}99` : "#666";

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <motion.button
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        className="p-2 rounded-full transition-colors"
        style={{ color: theme.palette.accent }}>
        <ChevronLeft size={20} />
      </motion.button>

      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="text-lg font-semibold"
          style={{ fontFamily: "'Inter', sans-serif", color: textColor }}>
          {theme.name} {year}
        </motion.div>
        <button onClick={onToday}
          className="text-[10px] uppercase tracking-widest transition-opacity hover:opacity-100"
          style={{ color: subColor, opacity: 0.6 }}>
          Today
        </button>
      </div>

      <motion.button
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="p-2 rounded-full transition-colors"
        style={{ color: theme.palette.accent }}>
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
};

export default MonthNavigator;
