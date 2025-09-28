import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        displayOrder: dto.displayOrder,
        contents: {
          create: dto.contents.map((c) => ({
            name: c.name,
            slug: c.slug,
            description: c.description,
            details: c.details,
            language: c.language,
          })),
        },
        categories: {
          create: dto.categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
      include: { contents: true, categories: true },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: { contents: true, categories: true, productItems: true },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { contents: true, categories: true, productItems: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const exists = await this.prisma.product.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const { contents, categoryIds, ...rest } = dto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        ...(contents
          ? {
              contents: {
                deleteMany: {}, // remove old
                create: contents.map((c) => ({
                  language: c.language,
                  name: c.name,
                  slug: c.slug,
                  description: c.description,
                  details: c.details,
                })),
              },
            }
          : {}),
        ...(categoryIds
          ? {
              categories: {
                deleteMany: {},
                create: categoryIds.map((categoryId) => ({
                  category: { connect: { id: categoryId } },
                })),
              },
            }
          : {}),
      },
      include: { contents: true, categories: true },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.product.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.prisma.product.delete({ where: { id } });
  }

  async search(dto: SearchProductDto) {
    const { name, description, minPrice, maxPrice, currency } = dto;
    const filters: any = [];

    if (name) {
      filters.push({
        contents: {
          some: {
            name: { contains: name, mode: 'insensitive' },
          },
        },
      });
    }

    if (description) {
      filters.push({
        contents: {
          some: {
            description: { contains: description, mode: 'insensitive' },
          },
        },
      });
    }

    if (minPrice !== undefined || maxPrice !== undefined || currency) {
      filters.push({
        productItems: {
          some: {
            prices: {
              some: {
                ...(currency ? { currency } : {}),
                ...(minPrice !== undefined
                  ? { price: { gte: Number(minPrice) } }
                  : {}),
                ...(maxPrice !== undefined
                  ? { price: { lte: Number(maxPrice) } }
                  : {}),
              },
            },
          },
        },
      });
    }
    const products = await this.prisma.product.findMany({
      where: { AND: filters },
      include: {
        contents: true,
        categories: true,
        productItems: { include: { prices: true } },
      },
    });

    if (!products.length) {
      throw new NotFoundException('No products found matching the filters');
    }
    return products;
  }
}
