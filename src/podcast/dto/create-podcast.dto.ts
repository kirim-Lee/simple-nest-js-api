import { Podcast } from '../entities/podcast.entity';
import { PickType } from '@nestjs/swagger';

export class CreatePodcastDto extends PickType(Podcast, [
  'category',
  'rating',
  'title',
]) {}
