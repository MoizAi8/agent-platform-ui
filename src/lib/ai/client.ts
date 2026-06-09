import OpenAI from "openai"

let client: OpenAI | null = null

export function getAIClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || "",
      dangerouslyAllowBrowser: !!process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })
  }
  return client
}

export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export interface AIContext {
  page?: string
  agents?: number
  metrics?: Record<string, string>
}

export async function streamChat(messages: Message[], context?: AIContext) {
  const systemPrompt = `You are Warehouse OS AI — an intelligent assistant for a warehouse multi-agent system. 
You help operators manage autonomous agents, interpret metrics, and optimize workflows.
Keep responses concise, data-driven, and actionable.
${context ? `Current context: Page=${context.page || "unknown"}, Agents=${context.agents || "—"}` : ""}`

  const openai = getAIClient()
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role as "user" | "assistant" | "system", content: m.content })),
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 500,
  })

  return response
}
