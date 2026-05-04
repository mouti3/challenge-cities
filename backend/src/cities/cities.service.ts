import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class CitiesService {
  private readonly citiesFilePath = join(__dirname, 'data', 'cities.json');

  async getAllCities(
    page = 1,
    limit = 10,
  ): Promise<City[] | { message: string; error: any; data: null }> {
    try {
      const raw = await readFile(this.citiesFilePath, 'utf-8');
      const { cities } = JSON.parse(raw) as { cities: City[] };
      const total = cities.length;
      const start = (page - 1) * limit;
      const data = cities.slice(start, start + limit);
      return data;
    } catch (error: unknown) {
      return {
        message: 'An error occurred!',
        error: error instanceof Error ? error.message : 'Unknown error',
        data: null,
      };
    }
  }
}
