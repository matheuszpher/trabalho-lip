import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteItemService {
  constructor(private prisma: PrismaService) {}

  async remove(id: number) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return await this.prisma.item.delete({
      where: { id },
    });
  }
}
