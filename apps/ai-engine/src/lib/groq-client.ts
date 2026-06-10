import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * SmartKode — Groq Client (LLaMA 3.3)
 * Used for:
 *   1. P1 Brief generation (fast, from client info)
 *   2. QA Bot (checks deliverable against P1 brief)
 */
export async function groqChat(
  systemPrompt: string,
  userMessage: string,
  model: string = "llama-3.3-70b-versatile"
): Promise<string> {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    model,
    temperature: 0.3,
    max_tokens: 2048,
  });

  return completion.choices[0]?.message?.content || "";
}

/**
 * Generate a P1 project brief from client + project info.
 * This is what the tech team receives — no client contact info.
 */
export async function generateP1Brief(projectInfo: {
  title: string;
  description: string;
  type: string;
  totalValue: number;
  deadline?: string;
}): Promise<string> {
  const systemPrompt = `You are SmartKode's project brief generator. Create a clear, professional, and actionable project brief (P1) for a tech team. The brief must include:
1. Project Overview (2-3 sentences)
2. Key Requirements (bullet points)
3. Technical Scope
4. Deliverables Expected
5. Timeline & Milestones (if applicable)
6. Quality Standards

IMPORTANT: Never include client contact information, budget details, or internal financial data.`;

  const userMessage = `Project Title: ${projectInfo.title}
Description: ${projectInfo.description}
Type: ${projectInfo.type}
Deadline: ${projectInfo.deadline || "To be determined"}`;

  return groqChat(systemPrompt, userMessage);
}

/**
 * QA Bot — Checks a deliverable description against the P1 brief.
 * Returns PASS or FAIL with detailed notes.
 */
export async function qaCheckDeliverable(
  p1Brief: string,
  deliverableDescription: string,
  fileName: string
): Promise<{ status: "PASS" | "FAIL"; notes: string }> {
  const systemPrompt = `You are SmartKode's QA Bot. Your job is to compare a deliverable against the original P1 project brief and determine if the deliverable meets the requirements.

Respond in this exact JSON format:
{
  "status": "PASS" or "FAIL",
  "notes": "Detailed explanation of what matches, what's missing, and what needs improvement"
}

Be thorough but fair. If the deliverable addresses the core requirements, mark PASS with improvement suggestions. Only mark FAIL if critical requirements are missing.`;

  const userMessage = `P1 BRIEF:
${p1Brief}

DELIVERABLE:
File: ${fileName}
Description: ${deliverableDescription}`;

  const response = await groqChat(systemPrompt, userMessage);

  try {
    const parsed = JSON.parse(response);
    return {
      status: parsed.status === "PASS" ? "PASS" : "FAIL",
      notes: parsed.notes || response,
    };
  } catch {
    // If parsing fails, assume PASS with the raw response as notes
    return {
      status: response.toLowerCase().includes("fail") ? "FAIL" : "PASS",
      notes: response,
    };
  }
}
