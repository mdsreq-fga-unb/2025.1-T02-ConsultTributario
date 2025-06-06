import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Claim } from './schemas/claim.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClaimDto } from './dto/create-claim.dto';
import { QuestionsService } from '../questions/questions.service';
import { UpdateClaimDto } from './dto/update-claim.dto';
import e from 'express';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectModel(Claim.name) private readonly claimModel: Model<Claim>,
    private readonly questionService: QuestionsService,
  ) {}

  async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    if (createClaimDto.relatedQuestion) {
      const existingQuestions = await this.questionService.findOne(
        createClaimDto.relatedQuestion,
      );
      if (!existingQuestions) {
        throw new BadRequestException('invalid related question ID');
      }
    }

    const existingClaim = await this.claimModel
      .findOne({ title: createClaimDto.title })
      .exec();
    if (existingClaim) {
      throw new BadRequestException('claim title already exists');
    }

    return this.claimModel.create(createClaimDto);
  }

  async findOne(id: string): Promise<Claim> {
    const claim = await this.claimModel
      .findById(id)
      .populate('relatedQuestion')
      .exec();
    if (!claim) {
      throw new NotFoundException('claim not found');
    }
    return claim;
  }

  async findAll(): Promise<Claim[]> {
    return this.claimModel.find().populate('relatedQuestion').exec();
  }

  async remove(id: string): Promise<void> {
    await this.claimModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, updateClaimDto: UpdateClaimDto): Promise<Claim> {
    if (updateClaimDto.relatedQuestion) {
      const existingQuestions = await this.questionService.findOne(
        updateClaimDto.relatedQuestion,
      );
      if (!existingQuestions) {
        throw new BadRequestException('invalid related question ID');
      }
    }

    const existingClaim = await this.claimModel
      .findOne({ title: updateClaimDto.title })
      .exec();
    if (existingClaim && existingClaim.id !== id) {
      throw new BadRequestException('claim title already exists');
    }

    const updatedClaim = await this.claimModel
      .findByIdAndUpdate(id, updateClaimDto, { new: true })
      .populate('relatedQuestion')
      .exec();

    if (!updatedClaim) {
      throw new NotFoundException('claim not found');
    }

    return updatedClaim;
  }
}
