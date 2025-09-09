import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const token = process.env.OPENAI_API_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "gpt-4o-mini";
const client = new OpenAI({ baseURL: endpoint, apiKey: token });
export const runtime = "edge";

export async function POST(req: Request) {
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
