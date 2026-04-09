import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategorySeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.categoryRepo.count();

    if (count > 0) {
      console.log('❌ Categories already exist.');
      return;
    }

    await this.categoryRepo.save([
      { name: 'Electronics', description: 'Electronic items' },
      { name: 'Fashion', description: 'Clothing & accessories' },
    ]);

    console.log('✅ Categories seeded!');
  }
}