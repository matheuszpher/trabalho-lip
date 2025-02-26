import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmpresaModule } from './empresa/empresa.module';
import { EstoqueModule } from './estoque/estoque.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [AuthModule, EmpresaModule, EstoqueModule, ItemModule],
})
export class AppModule {}
