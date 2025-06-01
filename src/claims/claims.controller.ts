import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ClaimDto } from './dto/claim.dto';
import { CreateClaimDto } from './dto/create-claim.dto';
import { Types } from 'mongoose';

@Serialize(ClaimDto)
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  async create(@Body() createClaimDto: CreateClaimDto) {
    return await this.claimsService.create(createClaimDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('invalid id');
    }
    return await this.claimsService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.claimsService.findAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('invalid id');
    }
    return await this.claimsService.remove(id);
  }
}
