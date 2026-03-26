import { createContext, useContext, useState, useCallback } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isInterviewDone, setIsInterviewDone] = useState(false);

  const addAnswer = useCallback((answer) => {
    setAnswers((prev) => [...prev, answer]);
  }, []);

  const addFeedback = useCallback((feedback) => {
    setFeedbacks((prev) => [...prev, feedback]);
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + 1 >= questions.length) {
        setIsInterviewDone(true);
        return prev;
      }
      return prev + 1;
    });
  }, [questions.length]);

  const resetInterview = useCallback(() => {
    setRole("");
    setDifficulty("");
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setFeedbacks([]);
    setIsInterviewDone(false);
  }, []);

  return (
    <InterviewContext.Provider
      value={{
        role, setRole,
        difficulty, setDifficulty,
        questions, setQuestions,
        currentIndex,
        answers, addAnswer,
        feedbacks, addFeedback,
        nextQuestion,
        isInterviewDone,
        resetInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);