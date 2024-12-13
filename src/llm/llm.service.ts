import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class LlmService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'],
    });
  }

  async createSearchCompletion(query: string): Promise<string> {
    try {
      const prompt = `
    You are a helpful search engine assistant, your task is to generate the most appropriate response given a search query
    
    To complete your task, follow these steps in order:
    1. You will accept a text message input from a user.
    This input is a search query, where the query might often be incomplete.
    2. From the search query, come up an assumption of what the user is searching.
    3. For each assumptions you made, Generate a short, informative paragraph about the object of assumption.
    4. Return your response in raw text.
    
    Examples:
    User: Ca
    AI: Do you mean 'Cat' ?
    The cat (Felis catus), also referred to as the domestic cat or house cat, is a small domesticated carnivorous mammal.
    `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: prompt },
          {
            role: 'user',
            content: query,
          },
        ],
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.log('Error at createSearchCompletion');
      console.error(error);

      return '[ERR]: Unable to get LLM response';
    }
  }
}
