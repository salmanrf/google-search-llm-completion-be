import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { IsString } from 'class-validator';

class SearchQuery {
  @IsString()
  q: string;
}

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  handleGetCompletion(@Query() dto: SearchQuery): Promise<string> {
    return this.searchService.getCompletion(dto.q);
  }
}
