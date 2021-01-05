import { IsString, IsOptional, IsNumber } from 'class-validator';
export class PatchEpisodeDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsOptional()
  movePodcastId?: number;
}
