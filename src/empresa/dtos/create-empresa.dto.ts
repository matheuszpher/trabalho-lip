import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateEmpresaDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'CNPJ must follow the format XX.XXX.XXX/XXXX-XX',
  })
  CNPJ: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
