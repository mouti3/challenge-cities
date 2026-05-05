import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({ example: 1, description: 'Current page (1-based)' })
  page!: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit!: number;

  @ApiProperty({ example: 5, description: 'Total number of pages' })
  totalPages!: number;

  @ApiProperty({ example: 42, description: 'Total number of items' })
  totalItems!: number;
}

export class APIResponse<T> {
  success!: boolean;
  data: { pagination: PaginationMeta; items: T } | null = null;
  error: any;
  message!: string | string[];
}
