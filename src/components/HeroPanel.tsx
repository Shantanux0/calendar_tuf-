import { motion, AnimatePresence } from "framer-motion";
import { MonthTheme } from "@/data/monthThemes";
import AmbientParticles from "./AmbientParticles";
import { useState, useEffect } from "react";

interface HeroPanelProps {
  theme: MonthTheme;
  monthIndex: number;
  year: number;
}

const HeroPanel = ({ theme, monthIndex, year }: HeroPanelProps) => {
  const p = theme.palette;
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => setTimeStr(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full overflow-hidden">
      {/* Ken Burns Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={monthIndex}
          src={theme.image}
          alt={theme.name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ animation: "breathe 6s ease-in-out infinite" }}
        />
      </AnimatePresence>

      {/* Gradient scrims */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%)`
      }} />
      <div className="absolute inset-0" style={{
        background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)`
      }} />
      <div className="absolute inset-0 hidden lg:block" style={{
        background: `linear-gradient(to right, transparent 70%, ${p.bg} 100%)`
      }} />

      <AmbientParticles accent={p.accent} monthIndex={monthIndex} />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={monthIndex}>
            {/* Mood tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="inline-block px-3 py-1 rounded-full text-xs mb-3 backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.12)", color: p.text, border: "1px solid rgba(255,255,255,0.15)" }}>
              {theme.mood}
            </motion.div>

            {/* Month name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "#fff", letterSpacing: "-1px" }}>
              {theme.name}
            </motion.h1>

            {/* Year */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.1 }}
              className="text-lg mt-1"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "#fff" }}>
              {year}
            </motion.p>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm italic mt-4 max-w-xs lg:max-w-sm leading-relaxed"
              style={{ color: "#fff" }}>
              "{theme.quote}"
            </motion.p>

            {/* Author */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xs mt-1 mb-6"
              style={{ color: "#fff" }}>
              — {theme.author}
            </motion.p>
            
            {/* Live Clock / Decorative Element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 10px rgba(74, 222, 128, 0.6)" }} />
              <span className="text-[10px] tracking-[0.2em] font-medium" style={{ color: "#fff", opacity: 0.6 }}>
                EPOCH TIME // {timeStr}
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default HeroPanel;
