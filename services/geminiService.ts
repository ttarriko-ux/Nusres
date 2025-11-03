
import { GoogleGenAI } from "@google/genai";

export const getMedicationInfo = async (medicationName: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key is not configured. Please set the API_KEY environment variable.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Provide a brief, easy-to-understand summary for a healthcare professional about the medication "${medicationName}". Include its common uses, primary mechanism of action, and key side effects to watch for. Format the response as simple text, with clear headings for each section.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching medication info from Gemini API:", error);
    return "Sorry, I couldn't retrieve information for that medication at the moment. Please check the console for errors.";
  }
};
