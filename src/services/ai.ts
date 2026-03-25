import { GoogleGenAI } from "@google/genai";
import { ChatMessage, MomentData } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateChatResponse(history: ChatMessage[], prompt: string) {
  const model = genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
      { role: 'user', parts: [{ text: prompt }] }
    ],
    config: {
      systemInstruction: `You are an AI Curator for the "Moment Creation Engine". 
      Your goal is to help users create a deeply personalized digital experience for emotional moments (proposals, anniversaries, birthdays).
      Ask short, emotionally aware, high-impact questions. 
      Keep the interaction under 3 minutes (about 4-6 questions).
      Adapt your tone based on the user's intent: romantic, playful, emotional, or appreciative.
      Start by asking who they are celebrating and what the occasion is.
      Once you have enough information (occasion, relationship, tone, key memories, messages), 
      tell the user you are ready to generate their moment and ask them to click the "Generate" button.`
    }
  });

  const response = await model;
  return response.text || "I'm sorry, I couldn't process that.";
}

export async function generateMomentNarrative(data: MomentData) {
  const model = genAI.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [
      {
        role: 'user',
        parts: [{
          text: `Generate a deeply personal and emotional story narrative for a ${data.occasion} for ${data.relationship}.
          Tone: ${data.tone}
          Memories: ${data.memories.join(", ")}
          Messages: ${data.messages.join(", ")}
          
          The output should be a JSON object with:
          1. "narrative": A flowing story (3-4 paragraphs) that feels handcrafted and human.
          2. "sections": An array of objects, each with "title", "content", and "suggestedMediaIndex" (referring to the index in the media array).
          3. "heroMessage": A short, powerful main message.
          
          Avoid generic phrases. Make it feel unique.`
        }]
      }
    ],
    config: {
      responseMimeType: "application/json"
    }
  });

  const response = await model;
  return JSON.parse(response.text || "{}");
}
