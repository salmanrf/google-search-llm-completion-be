import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';

@Injectable()
export class SearchService {
  constructor(private readonly llmService: LlmService) {}

  async getCompletion(query: string): Promise<string> {
    try {
      const result = await this.llmService.createSearchCompletion(query);

      return result;
    } catch (e) {
      console.log('e', e);

      throw new InternalServerErrorException('Error in getCompletion');
    }
  }
}
