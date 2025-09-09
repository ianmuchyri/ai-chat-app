"use server";

import { cookies } from "next/headers";

export async function getCookies() {
  const cookieStore = await cookies();
  const savedModel = cookieStore.get("ai_model");
  const savedApiKey = cookieStore.get("ai_api_key");
  return { model: savedModel, key: savedApiKey };
}
