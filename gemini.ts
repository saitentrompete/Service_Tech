import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Creates and returns a new GoogleGenerativeAI client instance.
 * This function defers the instantiation until it's actually needed,
 * preventing a crash on app load if the API key is not yet available.
 * It also aligns with best practices for using up-to-date credentials.
 * @returns {GoogleGenerativeAI} A new instance of the GoogleGenerativeAI client.
 */
export const getAiClient = () => {
  // Assume process.env.API_KEY is defined in the environment
  return new GoogleGenerativeAI(process.env.API_KEY);
};
