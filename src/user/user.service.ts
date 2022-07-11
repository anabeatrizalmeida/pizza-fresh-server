import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.user .delete({ where: { id } })
  }
  async update(id: string, createUserDto: UpdateUserDto): Promise<User > {
    await this.findById(id);

    delete createUserDto.confirmPassword;

    const data: Partial<User > = { ...createUserDto};

    return this.prisma.user .update({
      where: { id },
      data,
    }).catch(this.handleError);
  }
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User []> {
    return this.prisma.user .findMany();
  }

  async findById(id: string): Promise<User >{
    const record = await this.prisma.user .findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`)
    }

    return record;
  }

  async findOne(id: string): Promise<User > {
    return this.findById(id);
  }

  create(createUserDto: CreateUserDto): Promise<User > {
    delete createUserDto.confirmPassword;

    const user : User  = {...createUserDto };

    return this.prisma.user .create({
      data: user ,
    }).catch(this.handleError);
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'An error occurred while performing the operation',
    );
  }
}

