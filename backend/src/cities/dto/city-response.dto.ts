import { ApiProperty } from '@nestjs/swagger';
import { City } from '../entities/city.entity';
import { PaginationMeta } from '../../common/types/APIRespone';

export class CitiesResponseData {
  @ApiProperty({ type: [City], description: 'Cities for the current page' })
  items!: City[];

  @ApiProperty({ type: PaginationMeta })
  pagination!: PaginationMeta;
}

export class CitiesApiResponse {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ type: CitiesResponseData, nullable: true })
  data!: CitiesResponseData | null;

  @ApiProperty({ nullable: true, required: false })
  error?: unknown;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    example: 'Cities retrieved successfully',
  })
  message!: string | string[];
}
