# OpenClaw Copilot Demo

一个最小化的 GitHub Copilot SDK 驱动示例，提供：

- 自动代码编写（`/code` 指令）。
- 自动搜索最新 AI 资讯并总结（`/news` 指令）。
- 交互式聊天客户端，可直接发送消息给 Copilot。

## 快速开始

### 环境要求

- Node.js 18+（内置 `fetch`，无需额外依赖）。
- 可选：`COPILOT_TOKEN` 环境变量，如果你有 GitHub Copilot SDK 访问令牌。

### 安装

```bash
cd /home/runner/work/openclaw/openclaw
npm install
```

### 运行客户端

```bash
# 交互式 CLI
npm run chat
```

可用指令：

- `/code <需求>`：让 Copilot 生成对应语言的代码示例。
- `/news`：抓取最新 AI 资讯并自动总结。
- 其他任意文本将作为聊天消息发送给 Copilot。

如果未配置 `COPILOT_TOKEN`，应用会返回本地确定性的兜底响应，便于在离线或无凭据时验证流程。

### 配置（可选）

| 变量              | 默认值                                                | 说明                                   |
| ----------------- | ----------------------------------------------------- | -------------------------------------- |
| `COPILOT_TOKEN`   | _(无)_                                                | GitHub Copilot SDK 访问令牌            |
| `COPILOT_API_URL` | `https://api.githubcopilot.com/v1/chat/completions`   | Copilot 接口地址                       |
| `COPILOT_MODEL`   | `gpt-4o-mini`                                         | Copilot 模型名称                       |

### 测试

```bash
npm test
```

测试基于 Node 内置的 `node:test`，并使用注入的假 Copilot 和假 fetch，避免真实外部调用。
