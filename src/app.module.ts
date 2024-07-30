import { Module } from '@nestjs/common';

import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
