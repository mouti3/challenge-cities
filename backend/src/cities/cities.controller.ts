import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { City } from './entities/city.entity';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOperation({
    summary: 'Get all cities',
    description: 'Returns a paginated list of cities',
    operationId: 'getAllCities',
  })
  @ApiResponse({
    status: 200,
    description: 'List of cities retrieved successfully',
    type: [City],
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while retrieving cities',
  })
  @Get()
  findAll() {
    return this.citiesService.getAllCities();
  }
}
