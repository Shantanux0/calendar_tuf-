import CalendarShell from "@/components/CalendarShell";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{
        background: "radial-gradient(ellipse at center, #0a0a0a 0%, #050505 100%)",
      }}>
      {/* Subtle grid texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      <CalendarShell />
    </div>
  );
};

export default Index;
