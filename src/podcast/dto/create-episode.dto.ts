import { IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  content: string;
}
