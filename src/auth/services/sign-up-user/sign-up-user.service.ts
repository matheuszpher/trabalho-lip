import { Injectable } from '@nestjs/common';
import { SignUpUserDTO } from 'src/auth/dtos/sign-up-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class SignUpUserService {
  constructor(private prisma: PrismaService) {}

  async execute(dto: SignUpUserDTO) {
    const hashedPassword = await argon.hash(dto.password);
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.firstName,
        lastName: dto.lastName,
        role: 'ADMIN',
      },
    });
  }
}
