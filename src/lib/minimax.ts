export const MINIMAX_API_URL = "https://api.minimaxi.chat/v1/chat/completions";
export const MINIMAX_MODEL = "MiniMax-M2.5";
export const MINIMAX_MODEL_FAST = "MiniMax-M2.5-highspeed";

/** Strip MiniMax M2.5 chain-of-thought <think>...</think> blocks from output */
export function stripThinking(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

export interface MiniMaxMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callMiniMax(
  apiKey: string,
  messages: MiniMaxMessage[],
  options: { temperature?: number; max_tokens?: number; fast?: boolean } = {}
): Promise<string> {
  const model = options.fast ? MINIMAX_MODEL_FAST : MINIMAX_MODEL;
  const response = await fetch(MINIMAX_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 4000,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`MiniMax API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content ?? "";
  return stripThinking(content);
}
