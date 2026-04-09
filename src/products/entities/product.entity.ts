import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  category_id: number;

  @Column({ default: 0 })
  stock: number;

  // ✅ NEW FIELDS
  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_featured: boolean;

  @Column('float', { default: 0 })
  rating: number;

  @Column({ default: 0 })
  total_reviews: number;

  // timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}