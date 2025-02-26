import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUserDTO } from 'src/auth/dtos/sign-up-user.dto';
import { SignUpUserService } from 'src/auth/services/sign-up-user/sign-up-user.service';

@Controller('auth')
export class SignUpUserController {
  constructor(private signUpUserService: SignUpUserService) {}

  @Post('register')
  async handle(@Body() dto: SignUpUserDTO) {
    return await this.signUpUserService.execute(dto);
  }
}
