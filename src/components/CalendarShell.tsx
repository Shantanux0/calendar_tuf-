import { useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import IntegratedNotes from "./IntegratedNotes";

const pageVariants = {
  enter: (direction: number) => ({
    rotateX: direction > 0 ? 0 : 110,
    zIndex: direction > 0 ? 0 : 20,
    opacity: direction > 0 ? 1 : 0,
    filter: direction > 0 ? "brightness(0.7)" : "brightness(1)",
  }),
  center: {
    rotateX: 0,
    zIndex: 10,
    opacity: 1,
    filter: "brightness(1)",
  },
  exit: (direction: number) => ({
    rotateX: direction > 0 ? 110 : 0,
    zIndex: direction > 0 ? 20 : 0,
    opacity: direction > 0 ? 0 : 1,
    filter: direction > 0 ? "brightness(1)" : "brightness(0.7)",
  })
};

const CalendarShell = () => {
  const { days, currentMonth, currentYear, direction, goNext, goPrev, goToday } = useCalendar();
  const { startDate, endDate, hoverDate, setHoverDate, handleDayClick, clearRange, isInRange, isStart, isEnd, rangeLength } = useDateRange();
  const { saveNote, getNote, hasNote, openNote, selectedDate, currentColor, setCurrentColor, showDrawer, setShowDrawer, NOTE_COLORS } = useNotes();
  const isDark = false; // Locked to light mode as requested

  const theme = MONTH_THEMES[currentMonth];
  const calRef = useRef<HTMLDivElement>(null!);

  const onDayClick = useCallback((date: Date) => {
    handleDayClick(date);
    openNote(date); // Automatically select date for notes sync
  }, [handleDayClick, openNote]);

  // Dynamically determine the Note context (Month vs Day vs Date Range)
  let activeNoteKey = "";
  let activeNoteTitle = "";

  if (rangeLength > 0 && startDate && endDate) {
    activeNoteKey = `range-${startDate.getTime()}-${endDate.getTime()}`;
    activeNoteTitle = `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  } else if (selectedDate && !isInRange(selectedDate)) {
    activeNoteKey = selectedDate.toDateString();
    activeNoteTitle = selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  } else {
    activeNoteKey = `memo-${currentYear}-${currentMonth}`;
    activeNoteTitle = "Notes & Memos";
  }

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
      {/* Static Graphite / Dark Neutral Wall */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{
          backgroundColor: "#262626", // Neutral 800 (Rich dark grey)
        }}
      >
        {/* Professional, clean gallery header logo */}
        <img 
          src="/SecondaryLogoWO.png" 
          alt="Brand Logo"
          className="absolute top-8 left-8 md:top-10 md:left-10 w-32 md:w-40 opacity-60 mix-blend-plus-lighter"
        />

        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% -20%, rgba(255,255,255,0.1) 0%, transparent 80%)`
        }} />
        <div className="absolute inset-0 mix-blend-overlay" style={{
          opacity: 0.15,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} />
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1.3, 0.5, 1] }}
        className="w-full max-w-[750px] mx-auto rounded-xl overflow-hidden relative flex flex-col bg-background"
        style={{
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.15), 0 20px 40px -10px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)",
        }}>
        <BindingRings />

        {/* PAGE TURN WRAPPER */}
        <div className="flex-1 flex flex-col relative z-10" style={{ perspective: "1800px" }}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentMonth + currentYear}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.5 }}
              style={{ transformOrigin: "top center", width: "100%", display: "flex", flexDirection: "column" }}
              className="bg-background relative"
            >
              {/* Top Half: Visual Anchor */}
              <div className="w-full h-[380px] md:h-[450px] relative shrink-0">
          <HeroPanel theme={theme} monthIndex={currentMonth} year={currentYear} />
          {/* Edge separator to mimic printed split */}
          <div className="absolute bottom-0 left-0 right-0 h-[6px]" style={{ background: isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)" }} />
        </div>

        {/* Bottom Half: Split Paper Grid */}
        <div ref={calRef} className="w-full flex-1 flex flex-col md:flex-row p-5 md:p-8 relative"
          style={{ background: calBg, transition: "background 0.5s ease" }}>
          
          {/* Notes Sidebar */}
          <div className="order-2 md:order-1 w-full md:w-[35%] lg:w-[32%] h-[250px] md:h-auto mt-6 md:mt-0">
            <IntegratedNotes 
              noteText={getNote(activeNoteKey)?.text || ""}
              onSave={(text) => saveNote(activeNoteKey, text, currentColor)}
              accent={theme.palette.accent}
              isDark={isDark}
              noteTitle={activeNoteTitle} 
            />
          </div>

          {/* Calendar Grid Side */}
          <div className="order-1 md:order-2 flex-1 flex flex-col md:pl-6 md:border-l border-border/20">
            <MonthNavigator theme={theme} year={currentYear} onPrev={goPrev} onNext={goNext} onToday={goToday} isDark={isDark} />
            <div className="flex-1 relative mt-4">
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
            {/* Keyboard shortcuts minimal footer */}
            <div className="text-[9px] tracking-widest uppercase opacity-30 text-right mt-6"
              style={{ color: isDark ? theme.palette.text : "#666" }}>
              ← → Navigate · Esc Clear
            </div>
          </div>
        </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default CalendarShell;
