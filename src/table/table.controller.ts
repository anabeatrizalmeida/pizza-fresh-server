import { Controller, Get, Post } from '@nestjs/common';

@Controller('table')
export class TableController {
  @Get()
  findAll() {
    return 'Search all tables';
  }

  @Post()
  create() {
    return 'Create a table';
  }
}
