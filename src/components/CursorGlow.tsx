import { useState, useCallback } from "react";

const CursorGlow = ({ accent, containerRef }: { accent: string; containerRef: React.RefObject<HTMLDivElement> }) => {
  const [pos, setPos] = useState({ x: 0, y: 0, visible: false });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  }, [containerRef]);

  const handleLeave = useCallback(() => {
    setPos(p => ({ ...p, visible: false }));
  }, []);

  return {
    glowElement: pos.visible ? (
      <div className="absolute pointer-events-none z-0 transition-opacity duration-300"
        style={{
          left: pos.x - 100,
          top: pos.y - 100,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`,
        }} />
    ) : null,
    handlers: { onMouseMove: handleMove, onMouseLeave: handleLeave },
  };
};

export default CursorGlow;
