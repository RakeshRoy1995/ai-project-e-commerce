// gemini.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate')
  async generate(@Body() body: any) {
    const { prompt } = body;

    const response = await this.geminiService.generate(prompt);

    return {
      success: true,
      data: response,
    };
  }
}