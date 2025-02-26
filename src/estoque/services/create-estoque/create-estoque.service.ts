import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface IRequest {
  name: string;
  description: string;
  empresaId: number;
}

@Injectable()
export class CreateEstoqueService {
  constructor(private prisma: PrismaService) {}

  async execute(dto: IRequest) {
    const empresaExists = await this.prisma.empresa.findFirst({
      where: { id: dto.empresaId },
    });
    if (!empresaExists) {
      throw new NotFoundException('Empresa not found');
    }
    return await this.prisma.estoque.create({
      data: {
        name: dto.name,
        descricao: dto.description,
        empresaId: dto.empresaId,
      },
    });
  }
}
