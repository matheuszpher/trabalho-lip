import { Module } from '@nestjs/common';
import { CreateEmpresaService } from './services/create-empresa/create-empresa.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { CreateEmpresaController } from './controllers/create-empresa/create-empresa.controller';
import { RegisterUserOnEmpresaService } from './services/register-user-on-empresa/register-user-on-empresa.service';
import { RegisterUserOnEmpresaController } from './controllers/register-user-on-empresa/register-user-on-empresa.controller';

@Module({
  providers: [
    JwtStrategy,
    PrismaService,
    CreateEmpresaService,
    RegisterUserOnEmpresaService,
  ],
  controllers: [CreateEmpresaController, RegisterUserOnEmpresaController],
})
export class EmpresaModule {}
