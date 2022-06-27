import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTableDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The table number',
    example: 1,
  })
  number: number;
}
