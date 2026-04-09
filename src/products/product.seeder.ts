import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const count = await this.productRepo.count();

    if (count > 0) {
      console.log('❌ Products already exist. Seeder stopped.');
      return;
    }

    console.log('🌱 Seeding products...');

    const categories = await this.categoryRepo.find();

    if (!categories.length) {
      console.log('❌ No categories found. Seed categories first.');
      return;
    }

    const products: Partial<Product>[] = [
      {
        name: 'iPhone 15',
        slug: 'iphone-15',
        price: 1200,
        description: 'Latest Apple smartphone',
        category_id: categories[0].id,
        stock: 10,
        image: '/assets/i-phone-1.jpg',
        brand: 'Apple',
        is_featured: true,
        rating: 4.8,
        total_reviews: 120,
      },
      {
        name: 'Samsung Galaxy S23',
        slug: 'samsung-s23',
        price: 999,
        description: 'Flagship Samsung phone',
        category_id: categories[0].id,
        stock: 15,
        image: '/assets/s23-1.jpg',
        brand: 'Samsung',
        is_featured: true,
        rating: 4.6,
        total_reviews: 95,
      },
      {
        name: 'Nike Running Shoes',
        slug: 'nike-shoes',
        price: 150,
        description: 'Comfortable running shoes',
        category_id: categories[1]?.id,
        stock: 50,
        image: '/assets/nike-1.jpg',
        brand: 'Nike',
        rating: 4.5,
        total_reviews: 60,
      },


      {
        name: 'iPhone 16',
        slug: 'iphone-15-2',
        price: 1200,
        description: 'Latest Apple smartphone',
        category_id: categories[0].id,
        stock: 10,
        image: '/assets/i-phone-2.jpg',
        brand: 'Apple',
        is_featured: true,
        rating: 4.8,
        total_reviews: 120,
      },
      {
        name: 'Samsung Galaxy S22',
        slug: 'samsung-s23-2',
        price: 999,
        description: 'Flagship Samsung phone',
        category_id: categories[0].id,
        stock: 15,
        image: '/assets/s23-2.jpg',
        brand: 'Samsung',
        is_featured: true,
        rating: 4.6,
        total_reviews: 95,
      },
      {
        name: 'Nike Shoes',
        slug: 'nike-shoes-2',
        price: 150,
        description: 'Comfortable running shoes',
        category_id: categories[1]?.id,
        stock: 50,
        image: '/assets/nike-2.jpg',
        brand: 'Nike',
        rating: 4.5,
        total_reviews: 60,
      },


    ];
    await this.productRepo.save(products);

    console.log('✅ Products seeded successfully!');
  }
}