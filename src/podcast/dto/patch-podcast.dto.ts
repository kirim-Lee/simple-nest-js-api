import { IsNumber, IsString, IsOptional } from 'class-validator';

export class PatchPodcastDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;
}
