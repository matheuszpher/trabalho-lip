import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateUserDTO } from 'src/auth/dtos/create-user.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { AdminCreateUserService } from 'src/auth/services/admin-create-user/admin-create-user.service';

@Controller('admin/user')
@UseGuards(JwtGuard)
export class AdminCreateUserController {
  constructor(private service: AdminCreateUserService) {}
  @Post()
  async create(@Body() dto: CreateUserDTO, @GetUser() user: User) {
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return await this.service.execute({ ...dto, empresaId: user.empresaId });
  }
}
