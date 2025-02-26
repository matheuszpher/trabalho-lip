import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth/get-me')
@UseGuards(JwtGuard)
export class GetUserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@GetUser() user: User) {
    // Busca o usuário com a empresa associada
    const userWithEmpresa = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        empresa: true, // Inclui a empresa associada
      },
    });

    // Monta o retorno com os dados do usuário e da empresa, incluindo o email da empresa
    return {
      email: userWithEmpresa.email,
      name: userWithEmpresa.name,
      lastName: userWithEmpresa.lastName,
      role: userWithEmpresa.role,
      empresa: userWithEmpresa.empresa
        ? {
            id: userWithEmpresa.empresa.id,
            CNPJ: userWithEmpresa.empresa.CNPJ,
            name: userWithEmpresa.empresa.name,
            email: userWithEmpresa.empresa.email, // Inclui o email da empresa
          }
        : null,
    };
  }
}
