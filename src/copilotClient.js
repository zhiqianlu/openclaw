const DEFAULT_MODEL = process.env.COPILOT_MODEL || "gpt-4o-mini";
const COPILOT_TOKEN = process.env.COPILOT_TOKEN;
const COPILOT_API_URL =
  process.env.COPILOT_API_URL ||
  "https://api.githubcopilot.com/v1/chat/completions";

const FALLBACK_PREFIX =
  "Copilot is not configured. Returning a deterministic local response.";

function fallbackReply(messages, error) {
  const last = messages[messages.length - 1];
  const base = `${FALLBACK_PREFIX} Last request: ${last.content}`;
  if (error) {
    return `${base} (error: ${error.message || error.toString()})`;
  }
  return base;
}

async function sendMessage(messages, options = {}) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("messages must be a non-empty array");
  }

  const payload = {
    model: options.model || DEFAULT_MODEL,
    messages,
    temperature: options.temperature ?? 0.2,
    stream: false,
  };

  if (!COPILOT_TOKEN) {
    return { reply: fallbackReply(messages), raw: { offline: true } };
  }

  try {
    const response = await fetch(COPILOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COPILOT_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Copilot request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      fallbackReply(messages, new Error("Empty Copilot response"));

    return { reply, raw: data };
  } catch (error) {
    return { reply: fallbackReply(messages, error), raw: { error } };
  }
}

async function generateCode(prompt, language = "javascript") {
  const messages = [
    {
      role: "system",
      content:
        "You are an autonomous coding agent. Produce concise, working code snippets. Respond with code first.",
    },
    {
      role: "user",
      content: `Language: ${language}\nTask: ${prompt}`,
    },
  ];

  return sendMessage(messages, { temperature: 0.15 });
}

async function summarize(text) {
  const messages = [
    {
      role: "system",
      content:
        "Summarize the provided content into short bullet points. Keep it under 120 words.",
    },
    { role: "user", content: text },
  ];
  return sendMessage(messages, { temperature: 0.2 });
}

module.exports = {
  sendMessage,
  generateCode,
  summarize,
};
