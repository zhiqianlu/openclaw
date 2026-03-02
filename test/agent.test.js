const test = require("node:test");
const assert = require("node:assert");
const Agent = require("../src/agent");

const stubFetch = async () => ({
  ok: true,
  json: async () => ({
    hits: [
      {
        title: "AI breakthrough in robotics",
        url: "https://example.com/ai",
        author: "tester",
        created_at: "2024-01-01",
      },
    ],
  }),
});

const stubCopilot = {
  generateCode: async (prompt) => ({ reply: `code:${prompt}` }),
  summarize: async (text) => ({ reply: `summary:${text.slice(0, 20)}` }),
  sendMessage: async (messages) => ({
    reply: `chat:${messages[messages.length - 1].content}`,
  }),
};

test("returns help when input is empty", async () => {
  const agent = new Agent({ copilot: stubCopilot, fetchImpl: stubFetch });
  const result = await agent.handle("");
  assert.strictEqual(result.type, "empty");
});

test("handles code generation command", async () => {
  const agent = new Agent({ copilot: stubCopilot, fetchImpl: stubFetch });
  const result = await agent.handle("/code build an API client");
  assert.strictEqual(result.type, "code");
  assert.ok(result.reply.startsWith("code:"));
});

test("aggregates and summarizes AI news", async () => {
  const agent = new Agent({ copilot: stubCopilot, fetchImpl: stubFetch });
  const result = await agent.handle("/news");
  assert.strictEqual(result.type, "news");
  assert.ok(result.reply.startsWith("summary:"));
  assert.strictEqual(result.articles.length, 1);
});

test("falls back to chat for general input", async () => {
  const agent = new Agent({ copilot: stubCopilot, fetchImpl: stubFetch });
  const result = await agent.handle("hello");
  assert.strictEqual(result.type, "chat");
  assert.ok(result.reply.startsWith("chat:hello"));
});
