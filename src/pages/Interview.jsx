import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";
import { evaluateAnswer } from "../services/groq";
import QuestionCard from "../components/QuestionCard";
import FeedbackCard from "../components/FeedbackCard";
import Loader from "../components/Loader";

const Interview = () => {
  const {
    role, difficulty, questions, currentIndex,
    addAnswer, addFeedback, nextQuestion, isInterviewDone,
  } = useInterview();

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!questions || questions.length === 0) navigate("/");
  }, [questions, navigate]);

  useEffect(() => {
    if (isInterviewDone) navigate("/results");
  }, [isInterviewDone, navigate]);

  const handleSubmit = async () => {
    if (!answer.trim()) { setError("Please write your answer before submitting!"); return; }
    setError(""); setLoading(true);
    try {
      const result = await evaluateAnswer(questions[currentIndex], answer, role);
      setFeedback(result); addAnswer(answer); addFeedback(result);
    } catch {
      setError("Failed to evaluate answer. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setAnswer(""); setFeedback(null); setError(""); nextQuestion();
  };

  const progress = questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0;

  if (!questions.length) return null;

  return (
    <div style={{ minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <span style={{ color: "#818cf8", fontSize: "0.95rem", fontWeight: 600 }}>{role}</span>
            <span style={{ color: "#475569", margin: "0 8px" }}>·</span>
            <span style={{ color: "#94a3b8", fontSize: "0.95rem" }}>{difficulty}</span>
          </div>
          <span style={{ color: "#94a3b8", fontSize: "0.95rem", fontFamily: "JetBrains Mono, monospace" }}>
            Question <span style={{ color: "#f8fafc", fontWeight: 700 }}>{currentIndex + 1}</span> / {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "99px", height: "6px", marginBottom: "40px", overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg, #818cf8, #06b6d4)",
            borderRadius: "99px", transition: "width 0.5s ease-in-out"
          }} />
        </div>

        {/* Question */}
        <QuestionCard question={questions[currentIndex]} index={currentIndex} />

        {/* Loading */}
        {loading && <Loader message="Evaluating your answer..." />}

        {/* Answer Box */}
        {!feedback && !loading && (
          <div style={{ marginBottom: "24px", animation: "fade-up 0.5s ease 0.1s both" }}>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here... Be as detailed as possible!"
              rows={7}
              style={{
                width: "100%", background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px",
                padding: "24px", color: "#f8fafc", fontSize: "1rem",
                fontFamily: "DM Sans, sans-serif", lineHeight: 1.6,
                resize: "vertical", outline: "none",
                transition: "all 0.3s ease", marginBottom: "16px",
                boxShadow: "inset 0 4px 20px rgba(0,0,0,0.2)"
              }}
              onFocus={e => {
                e.target.style.borderColor = "#818cf8";
                e.target.style.boxShadow = "inset 0 4px 20px rgba(0,0,0,0.2), 0 0 0 3px rgba(129,140,248,0.15)";
                e.target.style.background = "rgba(0,0,0,0.3)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                e.target.style.boxShadow = "inset 0 4px 20px rgba(0,0,0,0.2)";
                e.target.style.background = "rgba(0,0,0,0.2)";
              }}
            />
            {error && <p style={{ color: "#f87171", fontSize: "0.9rem", marginBottom: "16px", marginLeft: "8px" }}>{error}</p>}

            <button
              onClick={handleSubmit}
              style={{
                width: "100%", padding: "18px", borderRadius: "16px", border: "none",
                background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
                color: "#ffffff", fontSize: "1.05rem", fontFamily: "Syne, sans-serif",
                fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Submit Answer →
            </button>
          </div>
        )}

        {/* Feedback */}
        {feedback && !loading && (
          <FeedbackCard
            feedback={feedback}
            onNext={handleNext}
            isLast={currentIndex + 1 >= questions.length}
          />
        )}

      </div>
    </div>
  );
};

export default Interview;