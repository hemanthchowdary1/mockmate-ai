import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useInterview } from "../context/InterviewContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { resetInterview } = useInterview();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    resetInterview();
    setDropdownOpen(false);
    navigate("/login");
  };

  // Get initials from username
  const initials = currentUser?.username
    ? currentUser.username.charAt(0).toUpperCase()
    : "?";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "72px",
        background: "rgba(5,5,8,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => {
            resetInterview();
            navigate("/");
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(99,102,241,0.15)",
              flexShrink: 0,
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#logo-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div style={{ fontWeight: 800, fontSize: "1.35rem", lineHeight: 1 }}>
            Mock
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mate
            </span>
            <span
              style={{
                color: "#f8fafc",
                fontSize: "0.95rem",
                marginLeft: "4px",
              }}
            >
              AI
            </span>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {currentUser && (
            <button
              onClick={() => {
                resetInterview();
                navigate("/");
              }}
              style={{
                padding: "9px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(99,102,241,0.35)",
                background: "rgba(99,102,241,0.1)",
                color: "#818cf8",
                fontSize: "0.9rem",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(99,102,241,0.18)";
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(99,102,241,0.1)";
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
              }}
            >
              + New Interview
            </button>
          )}

          {/* Profile / Auth */}
          {currentUser ? (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              {/* Avatar Button */}
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "none",
                  boxShadow: dropdownOpen
                    ? "0 0 0 2px #6366f1, 0 0 20px rgba(99,102,241,0.5)"
                    : "0 0 0 2px rgba(255,255,255,0.1)",
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                  color: "white",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                  lineHeight: 1,
                  userSelect: "none",
                  WebkitAppearance: "none",
                  padding: 0,
                  outline: "none",
                }}
              >
                {initials}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 14px)",
                    right: 0,
                    width: "220px",
                    background: "#0d0d14",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    padding: "8px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                    zIndex: 200,
                    animation: "fade-up 0.2s ease forwards",
                  }}
                >
                  {/* User info */}
                  <div
                    style={{
                      padding: "14px",
                      marginBottom: "6px",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        color: "#f8fafc",
                        fontSize: "1rem",
                      }}
                    >
                      {currentUser.username}
                    </div>
                    {currentUser.email && (
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "0.78rem",
                          marginTop: "4px",
                        }}
                      >
                        {currentUser.email}
                      </div>
                    )}
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "transparent",
                      border: "none",
                      borderRadius: "10px",
                      color: "#f87171",
                      fontSize: "0.95rem",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "10px 22px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                color: "white",
                fontSize: "0.95rem",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(99,102,241,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99,102,241,0.35)";
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
