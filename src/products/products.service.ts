import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createDto: CreateProductDto, imagePath?: string): Promise<Product> {
    const category = await this.categoryRepo.findOne({ where: { id: createDto.category_id } });
    if (!category) throw new NotFoundException('Category not found');

    const product = this.productRepo.create({
      ...createDto,
      category,
    });

    return this.productRepo.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async update(id: number, updateDto: UpdateProductDto, imagePath?: string): Promise<Product> {
    const product = await this.findOne(id);

    if (updateDto.category_id) {
      const category = await this.categoryRepo.findOne({ where: { id: updateDto.category_id } });
      if (!category) throw new NotFoundException('Category not found');
      product.category = category;
    }

    product.name = updateDto.name ?? product.name;
    product.price = updateDto.price ?? product.price;
    product.description = updateDto.description ?? product.description;
    if (imagePath) product['image'] = imagePath;

    return this.productRepo.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }
}