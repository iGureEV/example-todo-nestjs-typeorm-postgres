import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('index')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Приветствии' })
  @ApiResponse({ status: 200, description: 'Hello World' })
  getHello(): string {
    return this.appService.getHello();
  }
}
