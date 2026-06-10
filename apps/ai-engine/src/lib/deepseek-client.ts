import OpenAI from "openai";

/**
 * SmartKode — DeepSeek Client (via OpenAI-compatible API)
 * Used for: Invoice content generation and complex document formatting.
 */
const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function deepseekChat(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const completion = await deepseek.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.2,
    max_tokens: 1024,
  });

  return completion.choices[0]?.message?.content || "";
}
