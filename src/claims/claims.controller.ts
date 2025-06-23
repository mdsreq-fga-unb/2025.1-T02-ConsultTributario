import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { ClaimDto } from './dto/claim.dto';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { MongoIdValidationPipe } from '@common/pipes/mongo-id-validation.pipe';
import { Roles } from '@/auth/decorators/roles.decorator';
import { UserRole } from '@/users/schemas/user.schema';
import { RolesGuard } from '@/auth/guards/roles.guard';

@Serialize(ClaimDto)
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createClaimDto: CreateClaimDto) {
    return await this.claimsService.create(createClaimDto);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findById(@Param('id', MongoIdValidationPipe) id: string) {
    return await this.claimsService.findById(id);
  }

  @Get()
  async findAll() {
    return await this.claimsService.findAll();
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateClaimDto: UpdateClaimDto) {
    return await this.claimsService.update(id, updateClaimDto);
  }
}
