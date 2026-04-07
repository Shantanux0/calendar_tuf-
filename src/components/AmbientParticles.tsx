import { useMemo } from "react";

const AmbientParticles = ({ accent }: { accent: string }) => {
  const particles = useMemo(() =>
    Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 8,
      size: 2 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            background: accent,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s ${p.delay}s linear infinite`,
          }} />
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-110vh) translateX(${Math.random() > 0.5 ? '' : '-'}30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AmbientParticles;
