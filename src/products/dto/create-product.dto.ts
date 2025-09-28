/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Language } from '@prisma/client';

class ProductContentDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsEnum(Language)
  language: Language;
}

export class CreateProductDto {
  @IsOptional()
  displayOrder?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductContentDto)
  contents: ProductContentDto[];

  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds: string[];
}
