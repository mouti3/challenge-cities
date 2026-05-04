import { ApiProperty } from '@nestjs/swagger';

export class City {
  @ApiProperty({ example: 'Berlin', description: 'The name of the city' })
  name!: string;
  @ApiProperty({
    example: 'Berlin',
    description: 'The native name of the city',
  })
  name_native!: string;
  @ApiProperty({
    example: 'Germany',
    description: 'The country where the city is located',
  })
  country!: string;
  @ApiProperty({
    example: 'Europe',
    description: 'The continent where the city is located',
  })
  continent!: string;
  @ApiProperty({ example: 52.52, description: 'The latitude of the city' })
  latitude!: number;
  @ApiProperty({ example: 13.405, description: 'The longitude of the city' })
  longitude!: number;
  @ApiProperty({ example: 3669491, description: 'The population of the city' })
  population!: number;
  @ApiProperty({ example: 1237, description: 'The year the city was founded' })
  founded!: number;
  @ApiProperty({
    example: ['Brandenburg Gate', 'Berlin Wall'],
    description: 'Famous landmarks in the city',
  })
  landmarks!: string[];
}
