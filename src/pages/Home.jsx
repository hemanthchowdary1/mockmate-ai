import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";
import { generateQuestions } from "../services/groq";

const roles = [
  { label: "Frontend Developer", icon: "🎨", accent: "#fb923c" },
  { label: "Backend Developer", icon: "⚙️", accent: "#6366f1" },
  { label: "Full Stack Developer", icon: "🚀", accent: "#06b6d4" },
  { label: "Python Developer", icon: "🐍", accent: "#22c55e" },
  { label: "DevOps Engineer", icon: "🛠️", accent: "#a855f7" },
  { label: "Data Scientist", icon: "📊", accent: "#ec4899" },
];

const difficulties = [
  { label: "Beginner", icon: "🌱", desc: "Freshers & students", accent: "#22c55e" },
  { label: "Intermediate", icon: "🔥", desc: "1–3 years exp", accent: "#f59e0b" },
  { label: "Advanced", icon: "⚡", desc: "3+ years exp", accent: "#ef4444" },
];

const Home = () => {
  const { setRole, setDifficulty, setQuestions, role, difficulty } = useInterview();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!role || !difficulty) { setError("Please select both a role and difficulty!"); return; }
    setError(""); setLoading(true);
    try {
      const qs = await generateQuestions(role, difficulty);
      setQuestions(qs); navigate("/interview");
    } catch { setError("Failed to generate questions. Please try again!"); }
    finally { setLoading(false); }
  };

  const cardBase = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "16px",
    padding: "24px 20px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    textAlign: "left",
    width: "100%",
  };

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "10px 22px", borderRadius: "999px",
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
            color: "#a78bfa", fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#6366f1", display: "inline-block",
              boxShadow: "0 0 10px #6366f1",
              animation: "pulse-ring 2s ease-in-out infinite",
            }} />
            AI-Powered Interview Coach
          </div>
        </div>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{
            fontWeight: 800,
            fontSize: "clamp(2rem, 8vw, 4.5rem)",
            lineHeight: 1.1,
            marginBottom: "24px", color: "#f8fafc",
          }}>
            Ace Your Next<br />
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Tech Interview
            </span>
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.8 }}>
            Practice with AI-generated questions tailored to your role.<br />
            Get instant, detailed feedback on every answer.
          </p>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{
            color: "#717a88", fontSize: "0.75rem",
            textTransform: "uppercase", letterSpacing: "0.18em",
            fontFamily: "JetBrains Mono, monospace", marginBottom: "18px",
          }}>
            01 — Select Your Role
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {roles.map((r) => (
              <button
                key={r.label}
                onClick={() => setRole(r.label)}
                style={{
                  ...cardBase,
                  ...(role === r.label ? {
                    background: `${r.accent}18`,
                    border: `1px solid ${r.accent}55`,
                    boxShadow: `0 4px 28px ${r.accent}22`,
                    transform: "translateY(-3px)",
                  } : {}),
                }}
                onMouseEnter={e => { if (role !== r.label) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}}
                onMouseLeave={e => { if (role !== r.label) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}}
              >
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{r.icon}</div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: role === r.label ? "#f8fafc" : "#94a3b8" }}>
                  {r.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{
            color: "#717a88", fontSize: "0.75rem",
            textTransform: "uppercase", letterSpacing: "0.18em",
            fontFamily: "JetBrains Mono, monospace", marginBottom: "18px",
          }}>
            02 — Select Difficulty
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {difficulties.map((d) => (
              <button
                key={d.label}
                onClick={() => setDifficulty(d.label)}
                style={{
                  ...cardBase,
                  ...(difficulty === d.label ? {
                    background: `${d.accent}18`,
                    border: `1px solid ${d.accent}55`,
                    boxShadow: `0 4px 28px ${d.accent}22`,
                    transform: "translateY(-3px)",
                  } : {}),
                }}
                onMouseEnter={e => { if (difficulty !== d.label) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}}
                onMouseLeave={e => { if (difficulty !== d.label) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}}
              >
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{d.icon}</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc" }}>{d.label}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "6px" }}>{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#f87171", fontSize: "0.9rem", textAlign: "center", marginBottom: "16px" }}>{error}</p>
        )}

        {/* CTA */}
        <button
          onClick={handleStart}
          disabled={loading}
          style={{
            width: "100%", padding: "20px",
            borderRadius: "16px", border: "none",
            background: "linear-gradient(90deg, #6366f1, #818cf8, #06b6d4, #818cf8, #6366f1)",
            backgroundSize: "200% auto",
            animation: loading ? "none" : "shimmer 3s linear infinite",
            color: "white", fontSize: "1.1rem",
            fontFamily: "Syne, sans-serif", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 0 48px rgba(99,102,241,0.35)",
            opacity: loading ? 0.65 : 1,
            transition: "opacity 0.2s ease",
            letterSpacing: "0.3px",
          }}
        >
          {loading ? "⚡ Generating Questions..." : "Start Interview →"}
        </button>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginTop: "24px" }}>
          {[{ v: "10", l: "Questions per session" }, { v: "AI", l: "Powered feedback" }, { v: "6+", l: "Job roles covered" }].map(s => (
            <div key={s.l} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px", padding: "20px", textAlign: "center",
            }}>
              <div style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: "1.7rem", fontWeight: 700,
                background: "linear-gradient(135deg, #a78bfa, #06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{s.v}</div>
              <div style={{ color: "#64748b", fontSize: "0.82rem", marginTop: "6px" }}>{s.l}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;