import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { readFile } from 'node:fs/promises';
import { PaginationService } from 'src/common/pagination/pagination.service';

jest.mock('node:fs/promises');

const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;

const buildCity = (name: string): City => ({
  name,
  name_native: name,
  country: 'X',
  continent: 'Y',
  latitude: 0,
  longitude: 0,
  population: 0,
  founded: 0,
  landmarks: [],
});

describe('CitiesService', () => {
  let service: CitiesService;
  const cities: City[] = Array.from({ length: 12 }, (_, i) =>
    buildCity(`City${i + 1}`),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService, PaginationService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    mockedReadFile.mockResolvedValue(JSON.stringify({ cities }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns the first page with the requested limit', async () => {
    const res = await service.getAllCities(1, 4);

    expect(res.success).toBe(true);
    expect(res.data?.items).toHaveLength(4);
  });
});
