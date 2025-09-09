"use server";

import { cookies } from "next/headers";
import { decryptSymmetric, encryptSymmetric } from "./crypto";

const MODEL_KEY = "ai_model";
const API_KEY_KEY = "ai_api_key";

export async function getCookies() {
  const cookieStore = await cookies();

  const savedModel = cookieStore.get(MODEL_KEY)?.value;
  const savedApiKey = cookieStore.get(API_KEY_KEY)?.value;

  let model = savedModel || process.env.OPENAI_MODEL || "gpt-4o-mini";
  let apiKey = process.env.OPENAI_API_KEY || "";

  if (savedApiKey) {
    try {
      const { ciphertext, iv, tag } = JSON.parse(savedApiKey);
      apiKey = decryptSymmetric(ciphertext, iv, tag);
    } catch (err) {
      console.error("Failed to decrypt API key:", err);
    }
  }
  return { model, apiKey };
}

export async function setCookies(model: string, apiKey: string) {
  const cookieStore = await cookies();

  const { ciphertext, iv, tag } = encryptSymmetric(apiKey);

  cookieStore.set(MODEL_KEY, model, { httpOnly: true, sameSite: "strict" });
  cookieStore.set(API_KEY_KEY, JSON.stringify({ ciphertext, iv, tag }), {
    httpOnly: true,
    sameSite: "strict",
  });
}
