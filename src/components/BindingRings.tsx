const BindingRings = () => {
  return (
    <div className="w-full h-10 flex items-center justify-center gap-[calc(100%/14)] px-8"
      style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #111 50%, #0d0d0d 100%)" }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="relative w-[22px] h-[28px]">
          <div className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: "#555",
              boxShadow: "0 -2px 3px rgba(200,200,200,0.25), inset 0 1px 2px rgba(0,0,0,0.5)"
            }} />
          <div className="absolute inset-[3px] rounded-full border"
            style={{ borderColor: "#444" }} />
        </div>
      ))}
    </div>
  );
};

export default BindingRings;
