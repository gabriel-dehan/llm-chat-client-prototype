import { CompletionsStreamResponse } from "@src/types/completions.type";

/**
 * Extracts exclusively text content from a completion response.
 *
 * @param data The parsed CompletionsStreamResponse
 * @returns The extracted text or undefined if no text is found
 */
export function completionsText(data: CompletionsStreamResponse): string {
  // Check if we have valid candidates with parts
  if (!data.candidates?.[0]?.content?.parts?.length) {
    return "";
  }
  let text = "";

  for (const part of data.candidates[0].content.parts) {
    if (part.text) {
      text += part.text;
    }
    // TODO: Only for debugging
    else if (part.functionCall) {
      console.info("Function call detected in response:", part.functionCall);
    }
  }

  return text;
}
