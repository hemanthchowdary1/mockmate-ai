import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

const Results = () => {
  const { role, difficulty, questions, answers, feedbacks, resetInterview } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    if (!feedbacks.length || !questions.length) navigate("/");
  }, []);

  // Guard against render flash before effect fires
  if (!feedbacks.length || !questions.length) return null;

  const avg = (feedbacks.reduce((s, f) => s + f.score, 0) / feedbacks.length).toFixed(1);

  const getGrade = (a) => {
    if (a >= 8) return { grade: "A", label: "Outstanding", color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)" };
    if (a >= 6) return { grade: "B", label: "Good Job", color: "#06b6d4", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.25)" };
    if (a >= 4) return { grade: "C", label: "Keep Practicing", color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" };
    return { grade: "D", label: "Needs Improvement", color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)" };
  };

  const getScoreColor = (s) => s >= 8 ? "#10b981" : s >= 5 ? "#f59e0b" : "#ef4444";
  const grade = getGrade(parseFloat(avg));

  const glassStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "16px",
    padding: "24px",
  };

  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: "768px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🏆</div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2.5rem", marginBottom: "8px", color: "#f8fafc" }}>
            Interview Complete!
          </h1>
          <p style={{ color: "#64748b", fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem" }}>
            {role} · {difficulty}
          </p>
        </div>

        {/* Score Card */}
        <div
          style={{
            background: grade.bg,
            border: `1px solid ${grade.border}`,
            borderRadius: "24px",
            padding: "clamp(20px, 5vw, 40px)",
            marginBottom: "32px",
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(3.5rem, 12vw, 5rem)",
              fontWeight: 700,
              color: grade.color,
              lineHeight: 1,
              textShadow: `0 0 40px ${grade.color}`
            }}
          >
            {avg}
            <span style={{ fontSize: "2rem", color: "#334155" }}>/10</span>
          </div>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: grade.color, marginTop: "8px" }}>
            Grade {grade.grade} — {grade.label}
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "32px" }}>
            {[
              { value: questions.length, label: "Total Questions", color: "#f8fafc" },
              { value: feedbacks.filter(f => f.score >= 7).length, label: "Strong Answers", color: "#10b981" },
              { value: feedbacks.filter(f => f.score < 5).length, label: "Weak Answers", color: "#ef4444" },
            ].map((s) => (
              <div key={s.label} style={{ ...glassStyle, padding: "16px", borderRadius: "12px" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "1.8rem", fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ color: "#475569", fontSize: "0.75rem", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "16px", color: "#f8fafc" }}>
          Question Breakdown
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
          {questions.map((q, i) => (
            <div key={i} style={glassStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Q{String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "1rem", fontWeight: 600, color: getScoreColor(feedbacks[i]?.score) }}>
                  {feedbacks[i]?.score}/10
                </span>
              </div>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: "16px", color: "#f1f5f9", lineHeight: 1.5 }}>{q}</p>
              
              <div style={{ ...glassStyle, background: "rgba(255,255,255,0.02)", padding: "16px", marginBottom: "12px", borderRadius: "12px" }}>
                <p style={{ color: "#475569", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "JetBrains Mono, monospace", marginBottom: "6px" }}>Your Answer</p>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6 }}>{answers[i]}</p>
              </div>
              
              <div style={{ ...glassStyle, background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "12px" }}>
                <p style={{ color: "#475569", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "JetBrains Mono, monospace", marginBottom: "6px" }}>AI Feedback</p>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6 }}>{feedbacks[i]?.feedback}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Restart */}
        <button
          onClick={() => { resetInterview(); navigate("/"); }}
          style={{
            width: "100%", padding: "20px", borderRadius: "16px", border: "none",
            background: "linear-gradient(90deg, #6366f1, #818cf8, #06b6d4, #818cf8, #6366f1)",
            backgroundSize: "200% auto", animation: "shimmer 3s linear infinite",
            color: "white", fontSize: "1.1rem", fontFamily: "Syne, sans-serif", fontWeight: 700,
            cursor: "pointer", boxShadow: "0 0 48px rgba(99,102,241,0.35)", transition: "transform 0.2s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          Start New Interview 🎯
        </button>

      </div>
    </div>
  );
};

export default Results;