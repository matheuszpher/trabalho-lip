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
import { CreateEmpresaDTO } from 'src/empresa/dtos/create-empresa.dto';
import { CreateEmpresaService } from 'src/empresa/services/create-empresa/create-empresa.service';

@Controller('admin/empresa')
@UseGuards(JwtGuard)
export class CreateEmpresaController {
  constructor(private createEmpresaService: CreateEmpresaService) {}

  @Post()
  async handle(@Body() dto: CreateEmpresaDTO, @GetUser() user: User) {
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return await this.createEmpresaService.execute({ ...dto, userId: user.id });
  }
}
