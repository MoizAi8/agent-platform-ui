import { NextRequest } from "next/server"
import { streamChat, type Message, type AIContext } from "@/lib/ai/client"

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = (await req.json()) as { messages: Message[]; context?: AIContext }
    const stream = await streamChat(messages, context)

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ""
          if (content) controller.enqueue(encoder.encode(content))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    })
  } catch {
    return new Response(JSON.stringify({ error: "AI service unavailable" }), { status: 500 })
  }
}
