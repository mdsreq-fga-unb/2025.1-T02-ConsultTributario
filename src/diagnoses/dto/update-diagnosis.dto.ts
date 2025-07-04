import { PartialType } from '@nestjs/swagger';
import { CreateDiagnosisDto } from './create-diagnosis.dto';

export class UpdateDiagnosisDto extends PartialType(CreateDiagnosisDto) {}
