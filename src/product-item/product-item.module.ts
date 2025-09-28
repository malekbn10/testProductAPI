import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductItemsController } from './product-item.controller';
import { ProductItemsService } from './product-item.service';

@Module({
  imports: [PrismaModule],

  controllers: [ProductItemsController],
  providers: [ProductItemsService],
})
export class ProductItemModule {}
