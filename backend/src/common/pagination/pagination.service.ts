import { Injectable } from '@nestjs/common';
import { PaginationMeta } from '../types/APIRespone';

@Injectable()
export class PaginationService {
  getPaginationMeta(
    page: number,
    limit: number,
    totalItems: number,
  ): PaginationMeta {
    const totalPages = Math.ceil(totalItems / limit);
    return {
      page,
      limit,
      totalPages,
      totalItems,
    };
  }
}
