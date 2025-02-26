import {
  Controller,
  Param,
  Delete,
  UnauthorizedException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { DeleteItemService } from 'src/item/service/delete-item/delete-item.service';

@Controller('admin/item')
@UseGuards(JwtGuard)
export class DeleteItemController {
  constructor(private service: DeleteItemService) {}

  @Delete(':id')
  async remove(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return await this.service.remove(id);
  }
}
