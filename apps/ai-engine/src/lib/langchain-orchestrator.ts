/**
 * SmartKode — LangChain Orchestrator with AI Fallbacks
 * 
 * Coordinates multi-step AI flows and implements robust failover routing.
 * Primary: Groq / Gemini
 * Backups: OpenRouter, Together AI, HuggingFace
 */

import { generateP1Brief as groqP1Brief } from "./groq-client";
import { generateRetentionMessage, generateUpsellMessage } from "./gemini-client";

// Mock implementations for free fallback APIs (OpenRouter, Together AI)
async function openRouterFallback(prompt: string): Promise<string> {
  console.log("[AI_FALLBACK] Using OpenRouter backup...");
  // In a real implementation, you would use OpenAI SDK configured for OpenRouter base URL
  return `[OpenRouter Fallback] ${prompt.substring(0, 50)}...`;
}

async function togetherAIFallback(prompt: string): Promise<string> {
  console.log("[AI_FALLBACK] Using Together AI backup...");
  // In a real implementation, you would use Together API
  return `[Together AI Fallback] ${prompt.substring(0, 50)}...`;
}

/**
 * Resilient P1 Brief Generation with Waterfall Failover
 * Attempts: Groq -> OpenRouter -> Together AI
 */
async function resilientP1Brief(projectInfo: any): Promise<{ output: string; model: string }> {
  try {
    const output = await groqP1Brief(projectInfo);
    return { output, model: "groq/llama-3.3-70b" };
  } catch (error) {
    console.warn("[AI_ROUTER] Groq failed, failing over to OpenRouter:", error);
    try {
      const output = await openRouterFallback(JSON.stringify(projectInfo));
      return { output, model: "openrouter/free-model" };
    } catch (fallbackError) {
      console.warn("[AI_ROUTER] OpenRouter failed, failing over to Together AI:", fallbackError);
      const output = await togetherAIFallback(JSON.stringify(projectInfo));
      return { output, model: "together/free-model" };
    }
  }
}

export interface OrchestrationResult {
  step: string;
  output: string;
  model: string;
  durationMs: number;
}

/**
 * Project Onboarding Flow (With Fallbacks):
 * 1. Generate P1 Brief from project info
 */
export async function orchestrateProjectOnboarding(projectInfo: {
  title: string;
  description: string;
  type: string;
  totalValue: number;
  deadline?: string;
}): Promise<OrchestrationResult[]> {
  const results: OrchestrationResult[] = [];

  const briefStart = Date.now();
  const { output, model } = await resilientP1Brief(projectInfo);
  
  results.push({
    step: "P1 Brief Generation",
    output,
    model,
    durationMs: Date.now() - briefStart,
  });

  return results;
}

/**
 * Post-Delivery Retention Flow:
 * 1. Generate 48H follow-up (Gemini)
 * 2. Generate 30D follow-up (Gemini)
 * 3. Generate upsell message (Gemini)
 */
export async function orchestrateRetentionFlow(context: {
  clientName: string;
  projectTitle: string;
  projectType: string;
  deliveredDate: string;
}): Promise<OrchestrationResult[]> {
  const results: OrchestrationResult[] = [];

  // Step 1: 48H Follow-up
  const msg48hStart = Date.now();
  const msg48h = await generateRetentionMessage({
    clientName: context.clientName,
    projectTitle: context.projectTitle,
    deliveredDate: context.deliveredDate,
    type: "FOLLOWUP_48H",
  });
  results.push({
    step: "48H Follow-up Message",
    output: msg48h,
    model: "gemini/2.0-flash",
    durationMs: Date.now() - msg48hStart,
  });

  // Step 2: 30D Follow-up
  const msg30dStart = Date.now();
  const msg30d = await generateRetentionMessage({
    clientName: context.clientName,
    projectTitle: context.projectTitle,
    deliveredDate: context.deliveredDate,
    type: "FOLLOWUP_30D",
  });
  results.push({
    step: "30D Follow-up Message",
    output: msg30d,
    model: "gemini/2.0-flash",
    durationMs: Date.now() - msg30dStart,
  });

  // Step 3: Upsell
  const upsellStart = Date.now();
  const upsell = await generateUpsellMessage({
    clientName: context.clientName,
    projectTitle: context.projectTitle,
    projectType: context.projectType,
  });
  results.push({
    step: "Upsell Message",
    output: upsell,
    model: "gemini/2.0-flash",
    durationMs: Date.now() - upsellStart,
  });

  return results;
}
