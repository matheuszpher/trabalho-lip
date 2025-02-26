import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetMovimentacoesService {
  constructor(private prisma: PrismaService) {}

  async execute(userId: number) {
    const movimentacoes = await this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        empresa: {
          select: {
            estoques: {
              select: {
                items: {
                  select: {
                    movimentacoes: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const retorno = movimentacoes?.empresa?.estoques.map((estoque) => {
      return estoque.items.map((item) => {
        return item.movimentacoes;
      });
    });
    return retorno;
  }
}
