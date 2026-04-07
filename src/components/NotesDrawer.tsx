import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, X, Sparkles, Clock, Calendar } from "lucide-react";
import { MonthPalette } from "@/data/monthThemes";

interface Props {
  show: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  noteText: string;
  noteColor: string;
  onSave: (date: Date, text: string, color: string) => void;
  noteColors: string[];
  currentColor: string;
  onColorChange: (c: string) => void;
  palette: MonthPalette;
  isDark: boolean;
}

const WATERMARK_LINES = [
  "Dear diary...",
  "Today I felt...",
  "Things to remember:",
  "A moment worth saving...",
  "",
];

const NotesDrawer = ({ show, onClose, selectedDate, noteText, onSave, noteColors, currentColor, onColorChange, palette, isDark }: Props) => {
  const [text, setText] = useState(noteText);
  const [saved, setSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => { setText(noteText); }, [noteText]);

  if (!selectedDate) return null;

  const handleSave = () => {
    onSave(selectedDate, text, currentColor);
    setSaved(true);
    setShowConfetti(true);
    setTimeout(() => setSaved(false), 2000);
    setTimeout(() => setShowConfetti(false), 1500);
  };

  const dateStr = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          />

          {/* Floating note card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-50 w-[92vw] max-w-[420px]"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Glass card container */}
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: isDark
                  ? `linear-gradient(145deg, ${palette.card}ee, ${palette.bg}dd)`
                  : "linear-gradient(145deg, #ffffffee, #f8f8f6dd)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                boxShadow: isDark
                  ? `0 25px 60px -15px rgba(0,0,0,0.7), 0 0 40px -10px ${palette.accent}22`
                  : "0 25px 60px -15px rgba(0,0,0,0.15)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Save confetti burst */}
              <AnimatePresence>
                {showConfetti && (
                  <>
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1, scale: 0, x: "50%", y: "50%" }}
                        animate={{
                          opacity: 0,
                          scale: 1,
                          x: `${50 + (Math.cos(i * 30 * Math.PI / 180) * 120)}%`,
                          y: `${50 + (Math.sin(i * 30 * Math.PI / 180) * 80)}%`,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute z-50 pointer-events-none"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: i % 2 === 0 ? "50%" : "1px",
                          background: [palette.accent, "#FFD700", "#FF6B6B", "#4ECDC4", "#A78BFA", "#F472B6"][i % 6],
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} style={{ color: palette.accent }} />
                  <span
                    className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: palette.accent, fontFamily: "'Inter', sans-serif" }}
                  >
                    Note
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1.5 rounded-full transition-colors"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                    color: isDark ? palette.text : "#666",
                  }}
                >
                  <X size={14} />
                </motion.button>
              </div>

              {/* Date & Time display */}
              <div className="px-5 pb-3">
                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: isDark ? palette.text : "#1a1a1a",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {dateStr}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1.5" style={{ color: isDark ? `${palette.text}99` : "#888" }}>
                    <Calendar size={11} />
                    <span className="text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5" style={{ color: isDark ? `${palette.text}99` : "#888" }}>
                    <Clock size={11} />
                    <span className="text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {timeStr}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sticky note area */}
              <div className="px-5 pb-4">
                <div
                  className="relative rounded-lg overflow-hidden"
                  style={{ transform: "rotate(0.5deg)" }}
                >
                  {/* Pushpin */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full"
                    style={{
                      background: "radial-gradient(circle at 35% 35%, #e53935, #b71c1c)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 1px rgba(0,0,0,0.2)",
                    }}
                  />

                  {/* Corner fold */}
                  <div
                    className="absolute top-0 right-0 w-0 h-0 z-10"
                    style={{
                      borderLeft: "18px solid transparent",
                      borderTop: `18px solid ${currentColor}`,
                      filter: "brightness(0.82)",
                    }}
                  />

                  {/* Note body with faded watermark */}
                  <div className="relative pt-4 pb-3 px-4" style={{ background: currentColor }}>
                    {/* Faded watermark text behind textarea */}
                    {!text && (
                      <div
                        className="absolute inset-0 pt-4 px-4 pointer-events-none select-none"
                        style={{
                          fontFamily: "'Caveat', cursive",
                          fontSize: "18px",
                          lineHeight: "28px",
                          color: "rgba(0,0,0,0.08)",
                        }}
                      >
                        {WATERMARK_LINES.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    )}

                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Write your thoughts..."
                      rows={5}
                      className="w-full bg-transparent resize-none outline-none relative z-[1]"
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "18px",
                        lineHeight: "28px",
                        color: "#333",
                        backgroundImage:
                          "repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.06) 28px)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom bar: color picker + save */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{
                  borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <div className="flex items-center gap-2">
                  {noteColors.map((c) => (
                    <motion.button
                      key={c}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onColorChange(c)}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                      style={{
                        background: c,
                        border: currentColor === c ? "2px solid #555" : "2px solid transparent",
                        boxShadow: currentColor === c ? "0 0 8px rgba(0,0,0,0.15)" : undefined,
                      }}
                    >
                      {currentColor === c && <Check size={10} color="#555" strokeWidth={3} />}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSave}
                  className="relative px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide overflow-hidden"
                  animate={saved ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: saved
                      ? "linear-gradient(135deg, #43a047, #66bb6a)"
                      : `linear-gradient(135deg, ${palette.accent}, ${palette.accent}cc)`,
                    color: "#fff",
                    boxShadow: saved
                      ? "0 4px 16px rgba(67,160,71,0.4)"
                      : `0 4px 12px ${palette.accent}33`,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {saved ? (
                      <motion.span
                        key="saved"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1"
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          ✓
                        </motion.span>
                        Saved!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="save"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Save Note
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotesDrawer;
