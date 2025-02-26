import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateItemDto } from 'src/item/dtos/update-item.dto';

@Injectable()
export class UpdateItemService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, dto: UpdateItemDto) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const diferencaQuantidade = dto.quantidade - item.quantidade;

    await this.prisma.movimentacao.create({
      data: {
        tipo: diferencaQuantidade > 0 ? 'ENTRADA' : 'SAIDA',
        quantidade: Math.abs(diferencaQuantidade),
        itemId: item.id,
        data: new Date(),
      },
    });

    return await this.prisma.item.update({
      where: { id },
      data: {
        nome: dto.nome,
        descricao: dto.descricao,
        quantidade: dto.quantidade,
        preco: dto.preco,
      },
    });
  }
}
