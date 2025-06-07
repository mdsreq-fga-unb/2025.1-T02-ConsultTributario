import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Claim } from './schemas/claim.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClaimDto } from './dto/create-claim.dto';
import { QuestionsService } from '../questions/questions.service';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { IClaimService } from '@/shared/interfaces/claim.interface';
import { ERROR_MESSAGES } from '@/common/constants/app.constants';

@Injectable()
export class ClaimsService implements IClaimService {
  constructor(
    @InjectModel(Claim.name) private readonly claimModel: Model<Claim>,
    private readonly questionService: QuestionsService,
  ) {}

  async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    if (createClaimDto.relatedQuestion) {
      const existingQuestions = await this.questionService.findById(createClaimDto.relatedQuestion);
      if (!existingQuestions) {
        throw new BadRequestException(ERROR_MESSAGES.INVALID_RELATED_QUESTIONS);
      }
    }

    const existingClaim = await this.claimModel.findOne({ title: createClaimDto.title }).exec();
    if (existingClaim) {
      throw new BadRequestException(ERROR_MESSAGES.CLAIM_TITLE_EXISTS);
    }

    return this.claimModel.create(createClaimDto);
  }

  async findById(id: string): Promise<Claim> {
    const claim = await this.claimModel.findById(id).populate('relatedQuestion').exec();
    if (!claim) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }
    return claim;
  }

  async findAll(): Promise<Claim[]> {
    return this.claimModel.find().populate('relatedQuestion').exec();
  }

  async update(id: string, updateClaimDto: UpdateClaimDto): Promise<Claim> {
    if (updateClaimDto.relatedQuestion) {
      const existingQuestions = await this.questionService.findById(updateClaimDto.relatedQuestion);
      if (!existingQuestions) {
        throw new BadRequestException(ERROR_MESSAGES.INVALID_RELATED_QUESTIONS);
      }
    }

    const existingClaim = await this.claimModel.findOne({ title: updateClaimDto.title }).exec();
    if (existingClaim && existingClaim.id !== id) {
      throw new BadRequestException(ERROR_MESSAGES.CLAIM_TITLE_EXISTS);
    }

    const updatedClaim = await this.claimModel
      .findByIdAndUpdate(id, updateClaimDto, { new: true })
      .populate('relatedQuestion')
      .exec();

    if (!updatedClaim) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    return updatedClaim;
  }
}
