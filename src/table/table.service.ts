import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  findOne(id: string): Promise<Table> {
    return this.prisma.table.findUnique({ where: { id }});
  }

  create(createTableDto: CreateTableDto): Promise<Table> {
    const table: Table = {...createTableDto };

    return this.prisma.table.create({
      data: table,
    });
  }
}
