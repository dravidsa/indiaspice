
import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Recipe Idea Generator will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateRecipeIdea = async (ingredients: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable.";
  }
  
  try {
    const prompt = `You are a creative Indian chef. Given the following ingredients, suggest a creative and authentic-sounding Indian recipe title and a short, enticing one-sentence description.
    
    Ingredients: ${ingredients}
    
    Format your response as:
    Title: [Your Recipe Title]
    Description: [Your one-sentence description]
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating recipe idea:", error);
    return "Sorry, I couldn't come up with an idea right now. Please try again later.";
  }
};
