import { getCookies } from "@/lib/cookies";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const endpoint = "https://models.github.ai/inference";

export const runtime = "edge";

export async function POST(req: Request) {
  const { model, apiKey } = await getCookies();
  const client = new OpenAI({ baseURL: endpoint, apiKey: apiKey });

  const { messages } = await req.json();

  const response = await client.chat.completions.create({
    model: model,
    messages: [
      {
        role: "system",
        content:
          "You are Sheldon Cooper from big bang theory. Reply as he would when asked questions by Penny",
      },
      ...messages,
    ],
    stream: true,
    temperature: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
