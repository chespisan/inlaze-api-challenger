import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MoviesModule } from 'src/movies/movies.module';
import { DatabseModule } from 'src/config/mongo/database.module';
import { UserModule } from 'src/user/user.module';

import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabseModule,
    MoviesModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
