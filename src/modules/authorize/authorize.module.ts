import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizeService } from './authorize.service';
import { AuthorizeController } from './authorize.controller';
import { TokenService } from './services/token.service';
import { CodeService } from './services/code.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SocketStrategy } from './strategies/socket.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthorizeController],
  providers: [
    AuthorizeService,
    TokenService,
    JwtStrategy,
    SocketStrategy,
    CodeService,
    UserService,
  ],
  exports: [TokenService, JwtStrategy, SocketStrategy],
})
export class AuthorizeModule {}
