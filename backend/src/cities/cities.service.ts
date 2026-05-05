import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { APIResponse } from 'src/common/types/APIRespone';

@Injectable()
export class CitiesService {
  private readonly citiesFilePath = join(__dirname, 'data', 'cities.json');

  constructor(private readonly paginationService: PaginationService) {}

  async getAllCities(page = 1, limit = 10): Promise<APIResponse<City[]>> {
    const raw = await readFile(this.citiesFilePath, 'utf-8');
    const { cities } = JSON.parse(raw) as { cities: City[] };
    const totalItems = cities.length;
    const start = (page - 1) * limit;
    const data = cities.slice(start, start + limit);
    const meta = this.paginationService.getPaginationMeta(
      page,
      limit,
      totalItems,
    );
    return {
      data: {
        items: data,
        pagination: meta,
      },
      success: true,
      message: 'Cities retrieved successfully',
      error: null,
    };
  }
}
