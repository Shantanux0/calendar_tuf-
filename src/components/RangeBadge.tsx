import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full text-[11px] uppercase tracking-wide font-bold cursor-pointer z-10 shadow-xl border transition-all hover:scale-105"
        style={{
          backgroundColor: "#ffffff",
          color: "#0f172a",
          borderColor: "rgba(0,0,0,0.08)",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)"
        }}
        onClick={onClear}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span>{rangeLength} days <span className="opacity-30 mx-1">|</span> {fmt(startDate)} – {fmt(endDate)}</span>
        </div>
        <div className="opacity-40 hover:opacity-100 transition-opacity ml-1 bg-slate-100 rounded-full p-0.5">
          <X size={12} strokeWidth={3} />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default RangeBadge;
