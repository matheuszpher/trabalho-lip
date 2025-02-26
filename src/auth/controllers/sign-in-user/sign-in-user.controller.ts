import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignInUserDTO } from 'src/auth/dtos/sign-in-user.dto';
import { SignInUserService } from 'src/auth/services/sign-in-user/sign-in-user.service';

@Controller('auth/login')
export class SignInUserController {
  constructor(private service: SignInUserService) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() dto: SignInUserDTO) {
    return await this.service.execute(dto);
  }
}
