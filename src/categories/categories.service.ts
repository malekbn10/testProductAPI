import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        parentCategoryId: createCategoryDto.parentCategoryId,
        image: createCategoryDto.image,
        displayOrder: createCategoryDto.displayOrder,
        contents: {
          create: createCategoryDto.contents.map((content) => ({
            name: content.name,
            slug: content.slug,
            description: content.description,
            language: content.language,
          })),
        },
      },
      include: { contents: true },
    });
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: { contents: true, subCategories: true, products: true },
    });

    if (!categories.length) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { contents: true, subCategories: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const exists = await this.prisma.category.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        image: dto.image,
        displayOrder: dto.displayOrder,
      },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.category.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
