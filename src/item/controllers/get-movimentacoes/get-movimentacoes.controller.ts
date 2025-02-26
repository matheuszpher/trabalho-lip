import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetMovimentacoesService } from 'src/item/services/get-movimentacoes/get-movimentacoes.service';

@Controller('movimentacoes')
@UseGuards(JwtGuard)
export class GetMovimentacoesController {
  constructor(private service: GetMovimentacoesService) {}

  @Get()
  async handle(@GetUser('id') userId: number) {
    return await this.service.execute(userId);
  }
}
