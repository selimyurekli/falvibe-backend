// services/aiService.js

import { OpenAI } from 'openai';

const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://falvibe.com",
    "X-Title": "FalVibe",
  },
});

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AiService {

    static async generateAITextResponse (modelSettings, userContent) {
      const modelIdentifier = modelSettings.modelIdentifier;
      const prompt = modelSettings.prompt;
      const temperature = modelSettings.temperature;
      const maxTokens = modelSettings.maxTokens;
    
      if (!prompt) throw new Error('Prompt gerekli.');
    
      const response = await openRouter.chat.completions.create({
        model: modelIdentifier,
        messages: [
          {
            role: 'system',
            content: prompt
          },
          {
            role: 'user',
            content: userContent
          }
        ],
        temperature: temperature,
        max_tokens: maxTokens
      });
      console.log(response);
    
      const generatedText = response.choices?.[0]?.message?.content;
    
      return generatedText;
    };

    static async generateAIPhotoResponse() {
      return "static/generated/123.jpg"
    }
}

export default AiService

