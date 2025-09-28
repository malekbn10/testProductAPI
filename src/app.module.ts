import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ProductItemModule } from './product-item/product-item.module';

@Module({
  imports: [CategoriesModule, PrismaModule, ProductsModule, ProductItemModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
