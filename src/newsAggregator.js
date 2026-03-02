const copilotClient = require("./copilotClient");

const NEWS_ENDPOINT =
  "https://hn.algolia.com/api/v1/search?query=AI&tags=story&hitsPerPage=5";

async function fetchAiNews(fetchImpl = fetch) {
  const response = await fetchImpl(NEWS_ENDPOINT);
  if (!response.ok) {
    throw new Error(`Failed to fetch AI news: ${response.statusText}`);
  }

  const data = await response.json();
  const hits = Array.isArray(data?.hits) ? data.hits : [];

  return hits.map((hit) => ({
    title: hit.title,
    url: hit.url,
    author: hit.author,
    created_at: hit.created_at,
  }));
}

async function summarizeAiNews(articles, copilot = copilotClient) {
  if (!articles || articles.length === 0) {
    return { articles: [], summary: "没有找到最新的AI资讯。" };
  }

  const condensed = articles
    .map((article, index) => `${index + 1}. ${article.title} (${article.url})`)
    .join("\n");

  const { reply } = await copilot.summarize(
    `请用简洁的中文要点总结以下AI相关新闻：\n${condensed}`
  );

  const summary =
    reply ||
    "未能从Copilot获取总结，但已列出相关新闻，可手动查看上方链接。";

  return { articles, summary };
}

module.exports = {
  fetchAiNews,
  summarizeAiNews,
};
