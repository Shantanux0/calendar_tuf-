import { useMemo } from "react";

const AmbientParticles = ({ accent, monthIndex }: { accent: string, monthIndex: number }) => {
  // Determine season/particle type based on month index (0-11)
  const isWinter = monthIndex === 11 || monthIndex === 0 || monthIndex === 1; // Dec, Jan, Feb
  const isSpring = monthIndex === 2 || monthIndex === 3 || monthIndex === 4; // Mar, Apr, May
  const isAutumn = monthIndex === 8 || monthIndex === 9 || monthIndex === 10; // Sep, Oct, Nov

  const particleStyle = useMemo(() => {
    if (isWinter) return { color: "#ffffff", shape: "circle", count: 35, animName: "snowFall" };
    if (isAutumn) return { color: "#f59e0b", shape: "leaf", count: 18, animName: "leafFall" };
    if (isSpring) return { color: "#fbcfe8", shape: "petal", count: 25, animName: "petalDrift" };
    return { color: accent, shape: "circle", count: 15, animName: "floatUp" }; // Summer/Default embers
  }, [monthIndex, accent]);

  const particles = useMemo(() =>
    Array.from({ length: particleStyle.count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100, // random start offset for instant immersion
      delay: -(Math.random() * 15), // negative delay so they are instantly visible!
      duration: 10 + Math.random() * 12, // extremely slow and lazy drifting
      size: particleStyle.shape === "circle" ? 2 + Math.random() * 4 : 6 + Math.random() * 8, // leaves/petals are bigger
      opacity: 0.1 + Math.random() * 0.7,
      rotation: Math.random() * 360,
    })), [particleStyle]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 mix-blend-screen">
      {particles.map(p => {
        const isLeafOrPetal = particleStyle.shape !== "circle";
        return (
          <div key={p.id} className="absolute inline-block"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: isLeafOrPetal ? p.size * 0.6 : p.size,
              background: isLeafOrPetal ? "transparent" : particleStyle.color,
              backgroundColor: isLeafOrPetal ? particleStyle.color : undefined,
              borderRadius: isLeafOrPetal ? "0 50% 0 50%" : "50%",
              opacity: p.opacity,
              animation: `${particleStyle.animName} ${p.duration}s ${p.delay}s linear infinite`,
              transform: `rotate(${p.rotation}deg)`,
              boxShadow: particleStyle.shape === "circle" ? `0 0 ${p.size * 2}px ${particleStyle.color}` : "none",
            }} />
        );
      })}
      
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(110vh) translateX(0) scale(0.5); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-10vh) translateX(30px) scale(1); opacity: 0; }
        }
        @keyframes snowFall {
          0% { transform: translateY(-10vh) translateX(0) scale(0.8); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.5; }
          100% { transform: translateY(110vh) translateX(40px) scale(1.2); opacity: 0; }
        }
        @keyframes leafFall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(150px) rotate(720deg); opacity: 0; }
        }
        @keyframes petalDrift {
          0% { transform: translateY(-10vh) translateX(-20px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.7; }
          100% { transform: translateY(110vh) translateX(200px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AmbientParticles;
