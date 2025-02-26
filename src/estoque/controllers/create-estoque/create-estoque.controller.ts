import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateEstoqueDTO } from 'src/estoque/dto/create-estoque.dto';
import { CreateEstoqueService } from 'src/estoque/services/create-estoque/create-estoque.service';

@Controller('admin/estoque')
@UseGuards(JwtGuard)
export class CreateEstoqueController {
  constructor(private service: CreateEstoqueService) {}

  @Post()
  async handle(@GetUser() user: User, @Body() dto: CreateEstoqueDTO) {
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return await this.service.execute({ ...dto, empresaId: user.empresaId });
  }
}
