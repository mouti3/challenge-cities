import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { APIResponse } from 'src/common/types/APIRespone';
import { City } from './entities/city.entity';

const makeResponse = (
  page: number,
  limit: number,
  items: City[] = [],
): APIResponse<City[]> => ({
  success: true,
  message: 'ok',
  error: null,
  data: {
    items,
    pagination: { page, limit, totalPages: 1, totalItems: items.length },
  },
});

describe('CitiesController', () => {
  let controller: CitiesController;
  let serviceMock: jest.Mocked<Pick<CitiesService, 'getAllCities'>>;

  beforeEach(() => {
    serviceMock = { getAllCities: jest.fn() };
    controller = new CitiesController(serviceMock as unknown as CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllCities with the parsed page and limit', async () => {
    const response = makeResponse(1, 5);
    serviceMock.getAllCities.mockResolvedValue(response);

    const query: PaginationQueryDto = { page: 1, limit: 5 };
    const result = await controller.findAll(query);

    expect(serviceMock.getAllCities).toHaveBeenCalledWith(1, 5);
    expect(result).toBe(response);
  });

  it('get Null Data', async () => {
    const errorResponse: APIResponse<City[]> = {
      success: false,
      data: null,
      error: 'Something went wrong',
      message: 'Internal error',
    };
    serviceMock.getAllCities.mockResolvedValue(errorResponse);

    const result = await controller.findAll({
      page: 1,
      limit: 10,
    });

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBe('Something went wrong');
  });
});
