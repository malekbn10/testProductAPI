/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { Currency, Language } from '@prisma/client';

@Injectable()
export class ProductItemsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductItemDto) {
    return this.prisma.productItem.create({
      data: {
        productId: dto.productId,
        barcode: dto.barcode,
        reference: dto.reference,
        image: dto.image,
        online: dto.online,

        prices: {
          create: dto.prices.map((p) => ({
            price: p.price,
            currency: p.currency as Currency,
          })),
        },

        variations: dto.variations
          ? {
              create: dto.variations.map((v) => ({
                contents: {
                  create: v.contents.map((c) => ({
                    name: c.name,
                    value: c.value,
                    language: c.language as Language,
                  })),
                },
              })),
            }
          : undefined,
      },
      include: {
        prices: true,
        variations: { include: { contents: true } },
      },
    });
  }

  async findAll() {
    const items = await this.prisma.productItem.findMany({
      include: { prices: true, variations: { include: { contents: true } } },
    });
    if (!items.length) {
      throw new NotFoundException('No product items found');
    }
    return items;
  }

  async findOne(id: string) {
    const item = await this.prisma.productItem.findUnique({
      where: { id },
      include: { prices: true, variations: { include: { contents: true } } },
    });
    if (!item) {
      throw new NotFoundException(`ProductItem with id ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateProductItemDto) {
    const existing = await this.prisma.productItem.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`ProductItem with id ${id} not found`);
    }

    const { productId, prices, variations, ...rest } = dto;
    const data: any = { ...rest };

    if (prices) {
      data.prices = {
        deleteMany: {},
        create: prices.map((p) => ({
          price: p.price,
          currency: p.currency as Currency,
        })),
      };
    }

    if (variations) {
      data.variations = {
        deleteMany: {},
        create: variations.map((v) => ({
          contents: {
            create: v.contents.map((c) => ({
              name: c.name,
              value: c.value,
              language: c.language as Language,
            })),
          },
        })),
      };
    }

    return this.prisma.productItem.update({
      where: { id },
      data,
      include: { prices: true, variations: { include: { contents: true } } },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.productItem.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`ProductItem with id ${id} not found`);
    }
    return this.prisma.productItem.delete({ where: { id } });
  }
}
