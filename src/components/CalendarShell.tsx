import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { MONTH_THEMES } from "@/data/monthThemes";
import { useCalendar } from "@/hooks/useCalendar";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";
import { useTheme } from "@/hooks/useTheme";
import BindingRings from "./BindingRings";
import HeroPanel from "./HeroPanel";
import MonthNavigator from "./MonthNavigator";
import CalendarGrid from "./CalendarGrid";
import RangeBadge from "./RangeBadge";
import NotesDrawer from "./NotesDrawer";
import CursorGlow from "./CursorGlow";

const CalendarShell = () => {
  const { days, currentMonth, currentYear, goNext, goPrev, goToday } = useCalendar();
  const { startDate, endDate, hoverDate, setHoverDate, handleDayClick, clearRange, isInRange, isStart, isEnd, rangeLength } = useDateRange();
  const { saveNote, getNote, hasNote, openNote, selectedDate, currentColor, setCurrentColor, showDrawer, setShowDrawer, NOTE_COLORS } = useNotes();
  const { isDark, toggle } = useTheme();

  const theme = MONTH_THEMES[currentMonth];
  const calRef = useRef<HTMLDivElement>(null!);
  const { glowElement, handlers } = CursorGlow({ accent: theme.palette.accent, containerRef: calRef });

  const onDayClick = useCallback((date: Date) => {
    handleDayClick(date);
    openNote(date);
  }, [handleDayClick, openNote]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") { clearRange(); setShowDrawer(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext, clearRange, setShowDrawer]);

  const calBg = isDark ? theme.palette.card : "#fafaf8";

  return (
    <>
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-full max-w-[1200px] mx-auto rounded-3xl overflow-hidden relative"
      style={{
        boxShadow: "0 25px 80px -20px rgba(0,0,0,0.7), 0 10px 30px -10px rgba(0,0,0,0.5)",
      }}>
      <BindingRings />

      {/* Theme toggle */}
      <motion.button
        whileHover={{ rotate: 30 }}
        whileTap={{ scale: 0.85 }}
        onClick={toggle}
        className="absolute top-14 right-4 z-20 p-2 rounded-full backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </motion.button>

      <div className="flex flex-col lg:flex-row">
        {/* Hero */}
        <div className="w-full lg:w-[38%] relative min-h-[250px] md:min-h-[300px] lg:min-h-0">
          <HeroPanel theme={theme} monthIndex={currentMonth} year={currentYear} />
        </div>

        {/* Calendar side */}
        <div ref={calRef} {...handlers} className="w-full lg:w-[62%] relative flex flex-col"
          style={{ background: calBg, transition: "background 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
          {glowElement}
          <MonthNavigator theme={theme} year={currentYear} onPrev={goPrev} onNext={goNext} onToday={goToday} isDark={isDark} />

          <div className="flex-1 relative">
            <CalendarGrid
              days={days}
              theme={theme}
              monthIndex={currentMonth}
              isInRange={isInRange}
              isStart={isStart}
              isEnd={isEnd}
              onDayClick={onDayClick}
              onDayHover={setHoverDate}
              hasNote={hasNote}
              getNote={getNote}
              isDark={isDark}
            />
            <RangeBadge
              rangeLength={rangeLength}
              startDate={startDate}
              endDate={endDate}
              accent={theme.palette.accent}
              onClear={clearRange}
            />
          </div>

          {/* Notes drawer is now a floating overlay, rendered outside the layout flow */}

          {/* Keyboard shortcuts bar */}
          <div className="flex items-center justify-center gap-4 py-2 text-[10px] tracking-wider opacity-30"
            style={{
              fontFamily: "'Inter', monospace",
              color: isDark ? theme.palette.text : "#666",
            }}>
            <span>← → Navigate</span>
            <span>·</span>
            <span>Esc Clear</span>
            <span>·</span>
            <span>Click to Note</span>
          </div>
        </div>
      </div>
    </motion.div>

    <NotesDrawer
      show={showDrawer}
      onClose={() => setShowDrawer(false)}
      selectedDate={selectedDate}
      noteText={selectedDate ? getNote(selectedDate)?.text || "" : ""}
      noteColor={currentColor}
      onSave={saveNote}
      noteColors={NOTE_COLORS}
      currentColor={currentColor}
      onColorChange={setCurrentColor}
      palette={theme.palette}
      isDark={isDark}
    />
    </>
  );
};

export default CalendarShell;
