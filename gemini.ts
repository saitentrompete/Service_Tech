import { GoogleGenAI } from "@google/genai";

/**
 * Creates and returns a new GoogleGenAI client instance.
 * This function defers the instantiation until it's actually needed,
 * preventing a crash on app load if the API key is not yet available.
 * It also aligns with best practices for using up-to-date credentials.
 * @returns {GoogleGenAI} A new instance of the GoogleGenAI client.
 */
export const getAiClient = () => {
  // Assume process.env.API_KEY is defined in the environment
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};
