import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from 'src/item/dtos/create-item.dto';

@Injectable()
export class CreateItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateItemDto) {
    const estoqueExists = await this.prisma.estoque.findFirst({
      where: { id: dto.estoqueId },
    });
    if (!estoqueExists) {
      throw new NotFoundException('Estoque not found');
    }

    const item = await this.prisma.item.create({
      data: {
        nome: dto.name,
        descricao: dto.description,
        quantidade: dto.quantity,
        preco: dto.price,
        estoqueId: dto.estoqueId,
      },
    });

    await this.prisma.movimentacao.create({
      data: {
        tipo: 'ENTRADA',
        quantidade: dto.quantity,
        itemId: item.id,
        data: new Date(),
      },
    });
  }
}
