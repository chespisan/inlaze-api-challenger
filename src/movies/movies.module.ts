import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { MoviesController } from 'src/movies/movies.controller';
import { MoviesService } from 'src/movies/movies.service';
import configuration from 'src/config/configuration';

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
  providers: [MoviesService],
})
export class MoviesModule {}
