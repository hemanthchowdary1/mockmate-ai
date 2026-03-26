import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      signup(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", color: "#f8fafc",
    fontSize: "1rem", fontFamily: "DM Sans, sans-serif",
    outline: "none", transition: "all 0.2s ease",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        <div style={{ textAlign: "center", marginBottom: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: "56px", height: "56px", marginBottom: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "16px", boxShadow: "0 0 30px rgba(99,102,241,0.2)"
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#logo-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2rem", marginBottom: "8px" }}>
            Create account
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            Start your AI-powered interview prep today
          </p>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px", padding: "36px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.85rem", marginBottom: "8px", fontWeight: 500 }}>
                Username <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text" name="username" required
                value={form.username} onChange={handleChange}
                placeholder="developer"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.85rem", marginBottom: "8px", fontWeight: 500 }}>
                Email <span style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 400 }}>(Optional)</span>
              </label>
              <input
                type="email" name="email"
                value={form.email} onChange={handleChange}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.85rem", marginBottom: "8px", fontWeight: 500 }}>
                Password <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="password" name="password" required
                value={form.password} onChange={handleChange}
                placeholder="Enter password"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px", padding: "12px 16px",
                color: "#f87171", fontSize: "0.875rem", marginBottom: "20px",
              }}>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "16px",
                borderRadius: "12px", border: "none",
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                color: "white", fontSize: "1rem",
                fontFamily: "Syne, sans-serif", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(99,102,241,0.45)"; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)"; }}
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", color: "#64748b", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;