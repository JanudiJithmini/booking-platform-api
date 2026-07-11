import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    // Import UsersModule to access user-related services
    UsersModule,
    // Enable Passport authentication
    PassportModule,
    // Configure JWT authentication
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mySecretKey',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  // Register authentication controller
  controllers: [AuthController],
  // Register authentication service and JWT strategy
  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}