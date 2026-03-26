const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5">
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <div style={{
          width: "100%", height: "100%",
          border: "3px solid rgba(99,102,241,0.15)",
          borderTop: "3px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 8,
          border: "2px solid rgba(6,182,212,0.2)",
          borderBottom: "2px solid #06b6d4",
          borderRadius: "50%",
          animation: "spin 1.2s linear infinite reverse",
        }} />
      </div>
      <p style={{ color: "#64748b", fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace" }}>
        {message}
      </p>
    </div>
  );
};

export default Loader;