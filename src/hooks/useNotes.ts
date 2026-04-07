import { useState, useCallback, useEffect } from "react";

export interface Note {
  text: string;
  color: string;
  date: string;
}

const NOTE_COLORS = ["#FFF9C4", "#FCE4EC", "#E1F5FE", "#F1F8E9", "#F3E5F5", "#FBE9E7"];

export function useNotes() {
  const [notes, setNotes] = useState<Record<string, Note>>(() => {
    try {
      return JSON.parse(localStorage.getItem("epoch-notes") || "{}");
    } catch { return {}; }
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentColor, setCurrentColor] = useState(NOTE_COLORS[0]);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    localStorage.setItem("epoch-notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = useCallback((date: Date, text: string, color: string) => {
    const key = date.toDateString();
    if (text.trim()) {
      setNotes(n => ({ ...n, [key]: { text, color, date: key } }));
    } else {
      setNotes(n => { const copy = { ...n }; delete copy[key]; return copy; });
    }
  }, []);

  const getNote = useCallback((date: Date) => notes[date.toDateString()] || null, [notes]);
  const hasNote = useCallback((date: Date) => !!notes[date.toDateString()], [notes]);

  const openNote = useCallback((date: Date) => {
    setSelectedDate(date);
    const existing = notes[date.toDateString()];
    if (existing) setCurrentColor(existing.color);
    else setCurrentColor(NOTE_COLORS[0]);
    setShowDrawer(true);
  }, [notes]);

  return { notes, saveNote, getNote, hasNote, openNote, selectedDate, currentColor, setCurrentColor, showDrawer, setShowDrawer, NOTE_COLORS };
}

export { NOTE_COLORS };
