import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

interface IRequest {
  empresaId: number;
  name: string;
  email: string;
  password: string;
  lastName: string;
}

@Injectable()
export class AdminCreateUserService {
  constructor(private prisma: PrismaService) {}

  async execute(dto: IRequest) {
    const hashedPassword = await argon.hash(dto.password);
    return await this.prisma.user.create({
      data: {
        empresaId: dto.empresaId,
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        lastName: dto.lastName,
        role: 'USER',
      },
    });
  }
}
