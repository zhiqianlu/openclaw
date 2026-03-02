#!/usr/bin/env node
const readline = require("readline");
const Agent = require("./agent");

const agent = new Agent();

function renderResult(result) {
  if (!result) return;
  if (result.type === "news") {
    console.log("📰 最新 AI 资讯：");
    (result.articles || []).forEach((article, index) => {
      const link = article.url || "无链接"; // 某些资讯可能缺少外部链接，提供兜底文案。
      console.log(` ${index + 1}. ${article.title} (${link})`);
    });
    console.log("\n总结：");
  }
  console.log(result.reply);
  console.log("--------");
}

function startCli() {
  console.log("欢迎使用OpenClaw风格Copilot应用。");
  console.log("指令示例：");
  console.log(" /code 用Python写一个快速排序");
  console.log(" /news 查看最新AI资讯并总结");
  console.log(" 普通聊天内容将直接交给Copilot");
  console.log("按Ctrl+C退出。\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  async function ask() {
    rl.question("> ", async (input) => {
      try {
        const result = await agent.handle(input);
        renderResult(result);
      } catch (error) {
        console.error("执行出错：", error.message);
      }
      ask();
    });
  }

  ask();
}

if (require.main === module) {
  startCli();
}

module.exports = { startCli };
