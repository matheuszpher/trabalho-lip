import { Injectable, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { PrismaService } from 'src/prisma/prisma.service';

interface IRequest {
  userId: number;
  empresaId: number;
}

@Injectable()
@UseGuards(JwtGuard)
export class RegisterUserOnEmpresaService {
  constructor(private prisma: PrismaService) {}

  async execute({ userId, empresaId }: IRequest) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { empresaId },
    });
  }
}
