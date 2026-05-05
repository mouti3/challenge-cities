import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CitiesApiResponse } from './dto/city-response.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

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
    type: CitiesApiResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters',
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while retrieving cities',
  })
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.citiesService.getAllCities(query.page, query.limit);
  }
}
