/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { Language } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CategoryContentDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Language)
  language: Language;
}

export class CreateCategoryDto {
  @IsOptional()
  @IsString()
  parentCategoryId?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  displayOrder?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryContentDto)
  contents: CategoryContentDto[];
}
