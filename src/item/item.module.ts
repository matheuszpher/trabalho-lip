import { Module } from '@nestjs/common';
import { CreateItemController } from './controllers/create-item/create-item.controller';
import { CreateItemService } from './service/create-item/create-item.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UpdateItemController } from './controllers/update-item/update-item.controller';
import { DeleteItemController } from './controllers/delete-item/delete-item.controller';
import { UpdateItemService } from './service/update-item/update-item.service';
import { DeleteItemService } from './service/delete-item/delete-item.service';
import { GetItemService } from './service/get-item/get-item.service';
import { GetItemController } from './controllers/get-item/get-item.controller';
import { GetMovimentacoesService } from './services/get-movimentacoes/get-movimentacoes.service';
import { GetMovimentacoesController } from './controllers/get-movimentacoes/get-movimentacoes.controller';

@Module({
  controllers: [
    CreateItemController,
    GetItemController,
    UpdateItemController,
    DeleteItemController,
    GetMovimentacoesController,
  ],
  providers: [
    CreateItemService,
    PrismaService,
    JwtStrategy,
    UpdateItemService,
    DeleteItemService,
    GetItemService,
    GetMovimentacoesService,
  ],
})
export class ItemModule {}
