import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateItemDto } from 'src/item/dtos/create-item.dto';
import { CreateItemService } from 'src/item/service/create-item/create-item.service';

@Controller('admin/item')
@UseGuards(JwtGuard)
export class CreateItemController {
  constructor(private service: CreateItemService) {}

  @Post()
  async create(@GetUser() user: User, @Body() dto: CreateItemDto) {
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return await this.service.create(dto);
  }
}
