import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * SmartKode — Gemini Client (Gemini 2.0 Flash)
 * Used for:
 *   1. Retention follow-up messages (48H + 30D after delivery)
 *   2. Upsell messages (30D follow-up with new project suggestions)
 */
export async function geminiChat(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * Generate a personalized retention follow-up message.
 * Sent 48 hours after project delivery to check satisfaction.
 */
export async function generateRetentionMessage(context: {
  clientName: string;
  projectTitle: string;
  deliveredDate: string;
  type: "FOLLOWUP_48H" | "FOLLOWUP_30D";
}): Promise<string> {
  const timeframe = context.type === "FOLLOWUP_48H" ? "48 hours" : "30 days";

  const prompt = `You are SmartKode's client success manager. Write a warm, professional, and personalized follow-up message for a client.

Context:
- Client Name: ${context.clientName}
- Project: ${context.projectTitle}
- Delivered: ${context.deliveredDate}
- This is the ${timeframe} follow-up

Guidelines:
- Be warm but professional
- Reference their specific project naturally
- Ask about their satisfaction
- ${context.type === "FOLLOWUP_30D" ? "Subtly suggest they might have new projects they need help with" : "Focus on ensuring everything is working correctly"}
- Keep it under 150 words
- Do NOT use generic templates — make it feel personal
- Sign off as "SmartKode Team"`;

  return geminiChat(prompt);
}

/**
 * Generate an upsell message suggesting new services.
 * Sent as part of the 30D retention cycle.
 */
export async function generateUpsellMessage(context: {
  clientName: string;
  projectTitle: string;
  projectType: string;
}): Promise<string> {
  const prompt = `You are SmartKode's business development assistant. Write a compelling but non-pushy message suggesting related services to a past client.

Context:
- Client Name: ${context.clientName}
- Previous Project: ${context.projectTitle}
- Project Type: ${context.projectType}

Guidelines:
- Reference their past project success
- Suggest 2-3 complementary services they might need
- Keep it friendly and consultative, not salesy
- Include a soft call-to-action
- Keep it under 120 words
- Sign off as "SmartKode Team"`;

  return geminiChat(prompt);
}
