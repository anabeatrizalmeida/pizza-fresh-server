import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TableService {
  findAll() {
    return 'Search all tables';
  }

  create(createTableDto: CreateTableDto) {
    return 'Create a table: ' + JSON.stringify(createTableDto);
  }
}
