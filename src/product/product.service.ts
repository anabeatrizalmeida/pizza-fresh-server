import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.product .delete({ where: { id } })
  }
  async update(id: string, dto: UpdateProductDto): Promise<Product > {
    await this.findById(id);

    const data: Partial<Product > = { ...dto };

    return this.prisma.product .update({
      where: { id },
      data,
    }).catch(this.handleError);
  }
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product []> {
    return this.prisma.product .findMany();
  }

  async findById(id: string): Promise<Product >{
    const record = await this.prisma.product .findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`)
    }

    return record;
  }

  async findOne(id: string): Promise<Product > {
    return this.findById(id);
  }

  create(createProductDto: CreateProductDto): Promise<Product > {
    const product : Product  = {...createProductDto };

    return this.prisma.product .create({
      data: product ,
    }).catch(this.handleError);
  }

  handleError(error: Error):undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(lastErrorLine || 'Some error occurred while performing the operation',);
;  }
}
