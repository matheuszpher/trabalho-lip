import {
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RegisterUserOnEmpresaService } from 'src/empresa/services/register-user-on-empresa/register-user-on-empresa.service';

@Controller('admin/empresa')
@UseGuards(JwtGuard)
export class RegisterUserOnEmpresaController {
  constructor(private service: RegisterUserOnEmpresaService) {}

  @Put(':empresaId/register')
  async handle(
    @GetUser('id') userId: number,
    @Param('empresaId', ParseIntPipe) empresaId: number,
  ) {
    return await this.service.execute({ userId, empresaId });
  }
}
