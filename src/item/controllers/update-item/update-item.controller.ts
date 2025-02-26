import {
  Controller,
  Put,
  Param,
  Body,
  UnauthorizedException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UpdateItemDto } from 'src/item/dtos/update-item.dto';
import { UpdateItemService } from 'src/item/service/update-item/update-item.service';

@Controller('admin/item')
@UseGuards(JwtGuard)
export class UpdateItemController {
  constructor(private service: UpdateItemService) {}

  @Put(':id')
  async update(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateItemDto,
  ) {
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return await this.service.update(id, dto);
  }
}
