import axios from "axios";

const groqClient = axios.create({
  baseURL: import.meta.env.VITE_GROQ_BASE_URL,
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    "Content-Type": "application/json",
  },
});

const model = import.meta.env.VITE_GROQ_MODEL;

// Strip markdown code fences the model sometimes wraps around JSON
const safeParseJSON = (raw) => {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  return JSON.parse(cleaned);
};

export const generateQuestions = async (role, difficulty) => {
  const response = await groqClient.post("/chat/completions", {
    model,
    messages: [
      {
        role: "user",
        content: `Generate exactly 10 technical interview questions for a ${difficulty} level ${role} position.
Return ONLY a JSON array of 10 strings, no extra text, no markdown, no explanation.
Example format: ["Question 1?", "Question 2?", ...]`,
      },
    ],
    temperature: 0.7,
  });

  const content = response.data.choices[0].message.content;
  const questions = safeParseJSON(content);

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("Invalid questions format returned from API");
  }

  // Enforce exactly 10 regardless of what the model returns
  return questions.slice(0, 10);
};

export const evaluateAnswer = async (question, answer, role) => {
  const response = await groqClient.post("/chat/completions", {
    model,
    messages: [
      {
        role: "user",
        content: `You are an expert ${role} interviewer. Evaluate this answer:

Question: ${question}
Answer: ${answer}

Return ONLY a JSON object in this exact format, no extra text, no markdown:
{
  "score": <number 1-10>,
  "feedback": "<2-3 sentences of constructive feedback>",
  "strongPoints": "<what they did well>",
  "improvements": "<what they should improve>"
}`,
      },
    ],
    temperature: 0.5,
  });

  const content = response.data.choices[0].message.content;
  const result = safeParseJSON(content);

  if (typeof result.score !== "number" || typeof result.feedback !== "string") {
    throw new Error("Invalid feedback format returned from API");
  }

  return result;
};