import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
  imports: [CommonModule],
})
export class CitiesModule {}
