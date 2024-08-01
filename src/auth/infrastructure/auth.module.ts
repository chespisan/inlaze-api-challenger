import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController, AuthService, LocalStrategy } from 'src/auth';
import configuration from 'src/config/configuration';
import { UserModule } from 'src/user/infrastructure/user.module';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { secret } = configService.auth;
        return {
          secret,
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [configuration.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
