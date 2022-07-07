import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: `Product's name`,
    example: 'Mozzarella Pizza',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Product description',
    example:
      'Fine mozzarella cheese, thin pasta and rim stuffed with catupiry',
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: 'Price of the product',
    example: 12.34,
  })
  price: number;

  @IsUrl()
  @ApiProperty({
    description: 'Product image',
    example: 'https://i.imgur.com/hNE75Iw.png',
  })
  image: string;
}
