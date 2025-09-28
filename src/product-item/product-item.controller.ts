/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { ProductItemsService } from './product-item.service';
import { UpdateProductItemDto } from './dto/update-product-item.dto';

@Controller('product-items')
export class ProductItemsController {
  constructor(private readonly productItemsService: ProductItemsService) {}

  @Post()
  create(@Body() dto: CreateProductItemDto) {
    return this.productItemsService.create(dto);
  }

  @Get()
  findAll() {
    return this.productItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productItemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductItemDto) {
    return this.productItemsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productItemsService.remove(id);
  }
}
