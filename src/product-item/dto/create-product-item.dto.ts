/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Currency, Language } from '@prisma/client';

class ProductItemPriceDto {
  @IsNumber()
  price: number;

  @IsEnum(Currency)
  currency: Currency;
}

class ProductItemVariationContentDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsEnum(Language)
  language: Language;
}

class ProductItemVariationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemVariationContentDto)
  contents: ProductItemVariationContentDto[];
}

export class CreateProductItemDto {
  @IsUUID()
  productId: string;

  @IsString()
  barcode: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsBoolean()
  online: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemPriceDto)
  prices: ProductItemPriceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemVariationDto)
  variations?: ProductItemVariationDto[];
}
