import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { connect, host, name, user, pass } = configService.db;
        return {
          uri: `${connect}://${user}:${pass}${host}`,

          dbName: name,
        };
      },
      inject: [configuration.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabseModule {}
