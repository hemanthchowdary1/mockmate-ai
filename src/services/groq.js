const model = import.meta.env.VITE_GROQ_MODEL;

const safeParseJSON = (raw) => {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  return JSON.parse(cleaned);
};

const callGroq = async (body) => {
  const response = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const generateQuestions = async (role, difficulty) => {
  const data = await callGroq({
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

  const questions = safeParseJSON(data.choices[0].message.content);

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("Invalid questions format returned from API");
  }

  return questions.slice(0, 10);
};

export const evaluateAnswer = async (question, answer, role) => {
  const data = await callGroq({
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

  const result = safeParseJSON(data.choices[0].message.content);

  if (typeof result.score !== "number" || typeof result.feedback !== "string") {
    throw new Error("Invalid feedback format returned from API");
  }

  return result;
};