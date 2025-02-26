import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  nome: string;
  @IsOptional()
  @IsString()
  descricao: string;
  @IsOptional()
  @IsNumber()
  quantidade: number;
  @IsOptional()
  @IsNumber()
  preco: number;
}
