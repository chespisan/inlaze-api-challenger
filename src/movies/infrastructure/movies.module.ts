import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import configuration from 'src/config/configuration';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { MoviesUseCase } from '../application/use-cases/movie.usecase';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { token, url } = configService.movieApi;
        return {
          baseURL: url,
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      inject: [configuration.KEY],
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesUseCase],
})
export class MoviesModule {}
