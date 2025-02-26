import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetEstoquesFromUserService {
  constructor(private prisma: PrismaService) {}

  async execute(empresaId: number) {
    return await this.prisma.estoque.findMany({
      where: {
        empresaId,
      },
    });
  }
}
