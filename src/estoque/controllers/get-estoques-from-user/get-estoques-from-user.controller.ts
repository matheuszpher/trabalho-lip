import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetEstoquesFromUserService } from 'src/estoque/services/get-estoques-from-user/get-estoques-from-user.service';

@Controller('estoques')
@UseGuards(JwtGuard)
export class GetEstoquesFromUserController {
  constructor(private service: GetEstoquesFromUserService) {}

  @Get()
  async handle(@GetUser() user: User) {
    return await this.service.execute(user.empresaId);
  }
}
