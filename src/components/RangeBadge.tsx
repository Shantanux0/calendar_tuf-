import { motion, AnimatePresence } from "framer-motion";

interface Props {
  rangeLength: number;
  startDate: Date | null;
  endDate: Date | null;
  accent: string;
  onClear: () => void;
}

const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

const RangeBadge = ({ rangeLength, startDate, endDate, accent, onClear }: Props) => (
  <AnimatePresence>
    {rangeLength > 0 && startDate && endDate && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-xl flex items-center gap-2 cursor-pointer z-10"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
        }}
        onClick={onClear}>
        <span style={{ color: accent }}>✦</span>
        {rangeLength} days selected · {fmt(startDate)} – {fmt(endDate)}
      </motion.div>
    )}
  </AnimatePresence>
);

export default RangeBadge;
