// src/item/controllers/get-item/get-item.controller.ts
import { Controller, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetItemService } from 'src/item/service/get-item/get-item.service';

@Controller('/item')
@UseGuards(JwtGuard)
export class GetItemController {
  constructor(private service: GetItemService) {}

  @Get('empresa/:empresaId') // Novo endpoint com o ID da empresa
  async findAllByEmpresa(@Param('empresaId', ParseIntPipe) empresaId: number) {
    return await this.service.findAllByEmpresa(empresaId); // Passa o ID da empresa para o serviço
  }
}
