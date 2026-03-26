const FeedbackCard = ({ feedback, onNext, isLast }) => {
  const getConfig = (score) => {
    if (score >= 8) return {
      color: "#10b981",
      bg: "rgba(16,185,129,0.06)",
      border: "rgba(16,185,129,0.2)",
      label: "Excellent",
      badge: "rgba(16,185,129,0.12)",
      badgeBorder: "rgba(16,185,129,0.3)",
    };
    if (score >= 5) return {
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.06)",
      border: "rgba(245,158,11,0.2)",
      label: "Good",
      badge: "rgba(245,158,11,0.12)",
      badgeBorder: "rgba(245,158,11,0.3)",
    };
    return {
      color: "#ef4444",
      bg: "rgba(239,68,68,0.06)",
      border: "rgba(239,68,68,0.2)",
      label: "Needs Work",
      badge: "rgba(239,68,68,0.12)",
      badgeBorder: "rgba(239,68,68,0.3)",
    };
  };

  const config = getConfig(feedback.score);
  const scorePercent = (feedback.score / 10) * 100;

  const sections = [
    { icon: "💬", label: "Feedback", content: feedback.feedback, color: "#cbd5e1" },
    { icon: "✅", label: "Strong Points", content: feedback.strongPoints, color: "#86efac" },
    { icon: "🔧", label: "Improvements", content: feedback.improvements, color: "#fcd34d" },
  ];

  return (
    <div
      className="animate-fade-up"
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: "20px",
        overflow: "hidden",
        marginBottom: "24px",
      }}
    >
      {/* Score Header */}
      <div style={{
        padding: "24px 28px",
        borderBottom: `1px solid ${config.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
      }}>
        <div>
          <p style={{
            color: "#475569",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontFamily: "JetBrains Mono, monospace",
            marginBottom: "8px",
          }}>
            AI Feedback
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3 style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "1.6rem",
              color: "#f8fafc",
              margin: 0,
            }}>
              {config.label}
            </h3>
            <span style={{
              padding: "4px 12px",
              borderRadius: "999px",
              background: config.badge,
              border: `1px solid ${config.badgeBorder}`,
              color: config.color,
              fontSize: "0.8rem",
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 600,
            }}>
              {feedback.score}/10
            </span>
          </div>
        </div>

        {/* Circular score ring */}
        <div style={{ flexShrink: 0, position: "relative", width: 68, height: 68 }}>
          <svg width="68" height="68" viewBox="0 0 68 68">
            <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"/>
            <circle
              cx="34" cy="34" r="28"
              fill="none"
              stroke={config.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scorePercent / 100)}`}
              transform="rotate(-90 34 34)"
            />
          </svg>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: config.color,
          }}>
            {feedback.score}
          </div>
        </div>
      </div>

      {/* Sections — boxed, with bigger text */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {sections.map((s) => (
          <div
            key={s.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "18px 20px",
            }}
          >
            <p style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#475569",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontFamily: "JetBrains Mono, monospace",
              marginBottom: "10px",
            }}>
              <span>{s.icon}</span>
              {s.label}
            </p>
            <p style={{
              color: s.color,
              fontSize: "1rem",
              lineHeight: 1.75,
              margin: 0,
            }}>
              {s.content}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: "4px 24px 24px" }}>
        <button
          onClick={onNext}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            color: "#fff",
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1.05rem",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {isLast ? "See Final Results 🏆" : "Next Question →"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;