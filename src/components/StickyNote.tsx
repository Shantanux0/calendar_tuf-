import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  initialText: string;
  color: string;
  onSave: (text: string) => void;
  noteColors: string[];
  currentColor: string;
  onColorChange: (c: string) => void;
}

const StickyNote = ({ initialText, color, onSave, noteColors, currentColor, onColorChange }: Props) => {
  const [text, setText] = useState(initialText);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setText(initialText); }, [initialText]);

  const handleSave = () => {
    onSave(text);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-4 mt-4"
      style={{ transform: "rotate(0.8deg)" }}>
      {/* Pushpin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-5 h-5 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #e53935, #b71c1c)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 1px rgba(0,0,0,0.2)"
        }} />

      {/* Corner fold */}
      <div className="absolute top-0 right-0 w-0 h-0"
        style={{
          borderLeft: "20px solid transparent",
          borderTop: `20px solid ${color}`,
          filter: "brightness(0.85)",
        }} />

      {/* Note body */}
      <div className="rounded-sm pt-4 pb-3 px-4"
        style={{ background: color }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a note..."
          rows={5}
          className="w-full bg-transparent resize-none outline-none text-sm leading-7"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "18px",
            color: "#333",
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.07) 28px)",
          }}
        />
      </div>

      {/* Color picker */}
      <div className="flex items-center gap-2 mt-3 px-1">
        {noteColors.map(c => (
          <button key={c} onClick={() => onColorChange(c)}
            className="w-6 h-6 rounded-full border-2 transition-transform flex items-center justify-center"
            style={{
              background: c,
              borderColor: currentColor === c ? "#333" : "transparent",
              transform: currentColor === c ? "scale(1.2)" : "scale(1)",
            }}>
            {currentColor === c && <Check size={12} color="#333" />}
          </button>
        ))}

        <button onClick={handleSave}
          className="ml-auto px-3 py-1 rounded-md text-xs font-medium transition-all"
          style={{
            background: saved ? "#4caf50" : "rgba(0,0,0,0.7)",
            color: "#fff",
          }}>
          {saved ? "✓ Saved" : "Save Note"}
        </button>
      </div>
    </motion.div>
  );
};

export default StickyNote;
