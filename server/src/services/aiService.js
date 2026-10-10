import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_INSTRUCTION, checkForEmergency, EMERGENCY_RESPONSE } from '../utils/medicalSafety.js';

class AIService {
  constructor() {
    this.apiKey = process.env.AI_API_KEY;
    this.modelName = process.env.AI_MODEL || 'gemini-1.5-flash';
    this.client = null;

    if (this.apiKey && this.apiKey !== 'your_gemini_api_key_here') {
      try {
        this.client = new GoogleGenerativeAI(this.apiKey);
      } catch (err) {
        console.error('Failed to initialize GoogleGenerativeAI:', err.message);
      }
    }
  }

  /**
   * Primary method to send a prompt and bounded history to the AI provider.
   */
  async generateResponse(userMessage, conversationHistory = []) {
    // 1. Safety Emergency Check
    if (checkForEmergency(userMessage)) {
      return {
        reply: EMERGENCY_RESPONSE,
        isEmergency: true
      };
    }

    // 2. Fallback if no valid API key is present
    if (!this.client || !this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
      return {
        reply: `Hello! I am currently running in development/preview mode because an AI API Key has not been configured in the backend (\`server/.env\`).\n\nTo enable full AI capabilities using the free tier:\n1. Get a free API key at [Google AI Studio](https://aistudio.google.com/)\n2. Add \`AI_API_KEY=your_key\` to \`server/.env\`\n3. Restart the server.\n\nIn the meantime, you can explore the platform features like finding a doctor, booking an appointment, or using the BMI calculator!`,
        isEmergency: false
      };
    }

    // 3. Prepare Bounded History (Last 10 turns max to avoid token bloat & save costs)
    const boundedHistory = conversationHistory.slice(-10);

    try {
      const model = this.client.getGenerativeModel({
        model: this.modelName,
        systemInstruction: SYSTEM_INSTRUCTION
      });

      // Transform history to Gemini chat format
      const formattedHistory = boundedHistory.map(msg => ({
        role: msg.from === 'bot' || msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text || msg.content || '' }]
      }));

      const chat = model.startChat({
        history: formattedHistory
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      return {
        reply: text,
        isEmergency: false
      };
    } catch (error) {
      console.error('AI Service Provider Error:', error.message);
      throw new Error('The AI service is temporarily unavailable. Please try again shortly or speak to a healthcare professional.');
    }
  }
}

export default new AIService();
