export * from './app.service';
import { AppService } from './app.service';
export * from './cities.service';
import { CitiesService } from './cities.service';
export const APIS = [AppService, CitiesService];
