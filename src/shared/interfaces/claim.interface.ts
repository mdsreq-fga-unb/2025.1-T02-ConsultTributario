import { CreateClaimDto } from '@/claims/dto/create-claim.dto';
import { UpdateClaimDto } from '@/claims/dto/update-claim.dto';
import { Claim } from '@/claims/schemas/claim.schema';

export interface IClaimService {
  create(data: Partial<CreateClaimDto>): Promise<Claim>;
  findAll(): Promise<Claim[]>;
  findById(id: string): Promise<Claim>;
  update(id: string, data: UpdateClaimDto): Promise<Claim>;
}
