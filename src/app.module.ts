import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LlmModule } from './llm/llm.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [LlmModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
