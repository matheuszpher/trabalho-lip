import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInUserDTO } from 'src/auth/dtos/sign-in-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { SignTokenService } from '../sign-token/sign-token.service';

@Injectable()
export class SignInUserService {
  constructor(
    private prisma: PrismaService,
    private signTokenService: SignTokenService,
  ) {}

  async execute(dto: SignInUserDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (!userExists) {
      throw new BadRequestException('User not found');
    }
    const passwordMatch = await argon.verify(userExists.password, dto.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid password');
    }
    const token = await this.signTokenService.signToken(
      userExists.id,
      userExists.email,
    );
    return token;
  }
}
