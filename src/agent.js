const copilotClient = require("./copilotClient");
const { fetchAiNews, summarizeAiNews } = require("./newsAggregator");

class Agent {
  constructor({
    copilot = copilotClient,
    fetchImpl = fetch,
    systemPrompt,
  } = {}) {
    this.copilot = copilot;
    this.fetchImpl = fetchImpl;
    this.systemPrompt =
      systemPrompt ||
      "You are an OpenClaw-like autonomous assistant. You can write code, search latest AI news, and chat concisely.";
  }

  async handle(input) {
    const trimmed = (input || "").trim();
    if (!trimmed) {
      return { type: "empty", reply: "请输入指令或问题。" };
    }

    if (trimmed.startsWith("/code ")) {
      return this.handleCode(trimmed.replace("/code ", ""));
    }

    if (trimmed === "/news") {
      return this.handleNews();
    }

    return this.handleChat(trimmed);
  }

  async handleCode(prompt) {
    const { reply } = await this.copilot.generateCode(prompt);
    return { type: "code", reply };
  }

  async handleNews() {
    const articles = await fetchAiNews(this.fetchImpl);
    const { summary } = await summarizeAiNews(articles, this.copilot);
    return { type: "news", reply: summary, articles };
  }

  async handleChat(message) {
    const messages = [
      { role: "system", content: this.systemPrompt },
      { role: "user", content: message },
    ];
    const { reply } = await this.copilot.sendMessage(messages);
    return { type: "chat", reply };
  }
}

module.exports = Agent;
