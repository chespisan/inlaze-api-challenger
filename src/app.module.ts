import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from 'src/user/infrastructure/user.module';
import { AuthModule } from 'src/auth/infrastructure/auth.module';
import { DatabseModule } from 'src/config/mongo/database.module';

import configuration from 'src/config/configuration';
import { MoviesModule } from './movies/infrastructure/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabseModule,
    MoviesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
