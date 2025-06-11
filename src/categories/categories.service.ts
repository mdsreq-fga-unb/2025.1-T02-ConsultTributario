import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './schemas/create-category.schema';
import { UpdateCategoryDto } from './schemas/update-category.schema';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDocument> {
    try {
      this.logger.debug('Creating new category');
      const createdCategory = new this.categoryModel(createCategoryDto);
      const savedCategory = await createdCategory.save();
      this.logger.debug(`Category saved successfully: ${JSON.stringify(savedCategory)}`);
      return savedCategory;
    } catch (error) {
      this.logger.error(`Error creating category: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<CategoryDocument[]> {
    try {
      this.logger.debug('Finding all categories');
      const categories = await this.categoryModel.find().exec();
      this.logger.debug(`Found ${categories.length} categories`);
      return categories;
    } catch (error) {
      this.logger.error(`Error finding categories: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<CategoryDocument> {
    try {
      this.logger.debug(`Finding category with id: ${id}`);
      const category = await this.categoryModel.findById(id).exec();
      if (!category) {
        this.logger.debug('Category not found');
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      this.logger.debug(`Category found: ${JSON.stringify(category)}`);
      return category;
    } catch (error) {
      this.logger.error(`Error finding category: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDocument> {
    try {
      this.logger.debug(`Updating category with id: ${id}`);
      const updatedCategory = await this.categoryModel
        .findByIdAndUpdate(id, updateCategoryDto, { new: true })
        .exec();
      if (!updatedCategory) {
        this.logger.debug('Category not found');
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      this.logger.debug(`Category updated: ${JSON.stringify(updatedCategory)}`);
      return updatedCategory;
    } catch (error) {
      this.logger.error(`Error updating category: ${error.message}`);
      throw error;
    }
  }

  async remove(id: string): Promise<CategoryDocument> {
    try {
      this.logger.debug(`Removing category with id: ${id}`);
      const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();
      if (!deletedCategory) {
        this.logger.debug('Category not found');
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      this.logger.debug(`Category deleted: ${JSON.stringify(deletedCategory)}`);
      return deletedCategory;
    } catch (error) {
      this.logger.error(`Error removing category: ${error.message}`);
      throw error;
    }
  }
}