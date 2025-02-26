import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEstoqueDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
