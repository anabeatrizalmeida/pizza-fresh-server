import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { TableService } from './table.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Table } from './entities/table.entity';
@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get()
  @ApiOperation({
    summary: 'List all tables',
  })
  findAll(): Promise<Table[]>  {
    return this.tableService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'View a table',
  })
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a table',
  })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }
}
