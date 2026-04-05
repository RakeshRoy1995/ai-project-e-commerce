// gemini.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class GeminiService {
  private client: GoogleGenerativeAI;

  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }

  async generate(prompt: string): Promise<string> {
    const model = this.client.getGenerativeModel({
      model: 'gemini-2.5-flash', // fast & cheap
    });

    const result = await model.generateContent(prompt);

    return result.response.text();
  }

  async generateContent(prompt: string): Promise<string> {
    const model = this.client.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Combine system + user into a single string (Gemini doesn't support role arrays)
    const fullPrompt = `
    You are an AI product description assistant.
    Write a short, catchy product description for the following product/products:

    ${prompt}
    `;

    const result = await model.generateContent(fullPrompt);
    return result.response.text() || 'No response from Gemini';
  }
}