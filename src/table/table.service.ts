import { Injectable } from '@nestjs/common';

@Injectable()
export class TableService {
  findAll() {
    return 'Search all tables';
  }

  create() {
    return 'Create a table';
  }
}
