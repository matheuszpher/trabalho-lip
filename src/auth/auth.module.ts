import { Module } from '@nestjs/common';
import { SignUpUserService } from './services/sign-up-user/sign-up-user.service';
import { SignUpUserController } from './controllers/sign-up-user/sign-up-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInUserService } from './services/sign-in-user/sign-in-user.service';
import { SignTokenService } from './services/sign-token/sign-token.service';
import { SignInUserController } from './controllers/sign-in-user/sign-in-user.controller';
import { JwtService } from '@nestjs/jwt';
import { GetUserController } from './controllers/get-user/get-user.controller';
import { AdminCreateUserService } from './services/admin-create-user/admin-create-user.service';
import { AdminCreateUserController } from './controllers/admin-create-user/admin-create-user.controller';

@Module({
  providers: [
    JwtService,
    PrismaService,
    SignUpUserService,
    SignInUserService,
    SignTokenService,
    AdminCreateUserService,
  ],
  controllers: [SignUpUserController, SignInUserController, GetUserController, AdminCreateUserController],
})
export class AuthModule {}
