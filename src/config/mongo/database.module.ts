import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { connect, host, name, port } = configService.db;
        return {
          uri: `${connect}://${host}:${port}`,
          dbName: name,
        };
      },
      inject: [configuration.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabseModule {}
