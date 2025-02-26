import { Module } from '@nestjs/common';
import { CreateEstoqueService } from './services/create-estoque/create-estoque.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { CreateEstoqueController } from './controllers/create-estoque/create-estoque.controller';
import { GetEstoquesFromUserService } from './services/get-estoques-from-user/get-estoques-from-user.service';
import { GetEstoquesFromUserController } from './controllers/get-estoques-from-user/get-estoques-from-user.controller';

@Module({
  providers: [JwtStrategy, PrismaService, CreateEstoqueService, GetEstoquesFromUserService],
  controllers: [CreateEstoqueController, GetEstoquesFromUserController],
})
export class EstoqueModule {}
