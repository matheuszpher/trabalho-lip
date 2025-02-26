// src/item/service/get-item/get-item.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetItemService {
  constructor(private prisma: PrismaService) {}

  async findAllByEmpresa(empresaId: number) {
    return await this.prisma.item.findMany({
      where: {
        estoque: {
          empresaId, // Filtra pelos estoques que pertencem à empresa com o ID fornecido
        },
      },
    });
  }
}
