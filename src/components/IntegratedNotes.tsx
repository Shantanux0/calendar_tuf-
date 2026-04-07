import { motion } from "framer-motion";

interface IntegratedNotesProps {
  noteText: string;
  onSave: (text: string) => void;
  accent: string;
  isDark: boolean;
  noteTitle: string;
}

const IntegratedNotes = ({ noteText, onSave, accent, noteTitle }: IntegratedNotesProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-4 md:mb-6 pb-2 md:pb-3 border-b-2" style={{ borderColor: accent }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />
          <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] truncate" style={{ color: "#000" }}>
            {noteTitle}
          </h3>
        </div>
      </div>
      <div className="relative flex-1 min-h-[300px]">
        {/* Subtle architectural reference lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
          style={{ 
            backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.15) 28px)`,
            backgroundSize: '100% 28px',
            backgroundPosition: '0 4px',
          }}
        />

        {/* Textarea superimposed */}
        <textarea
          value={noteText}
          onChange={(e) => onSave(e.target.value)}
          className="relative w-full h-full bg-transparent resize-none outline-none border-none text-[13px] leading-[28px] z-10 pt-[4px] font-medium tracking-wide transition-opacity focus:opacity-100 opacity-80"
          style={{ color: "#0f172a" }}
          placeholder="Jot down notes..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default IntegratedNotes;
