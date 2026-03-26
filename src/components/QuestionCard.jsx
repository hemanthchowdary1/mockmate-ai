const QuestionCard = ({ question, index }) => {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "20px",
        padding: "32px",
        marginBottom: "24px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        animation: "fade-up 0.4s ease forwards",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <div
          style={{
            width: "44px", height: "44px",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem", fontWeight: 700, color: "#fff",
            boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
            fontFamily: "JetBrains Mono, monospace",
            flexShrink: 0,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <span style={{
          fontSize: "0.8rem", color: "#94a3b8", textTransform: "uppercase",
          letterSpacing: "0.2em", fontFamily: "JetBrains Mono, monospace", fontWeight: 600
        }}>
          Interview Question
        </span>
      </div>
      <p style={{
        fontSize: "1.3rem", lineHeight: 1.6, color: "#f8fafc",
        fontFamily: "Syne, sans-serif", fontWeight: 700, margin: 0,
      }}>
        {question}
      </p>
    </div>
  );
};

export default QuestionCard;