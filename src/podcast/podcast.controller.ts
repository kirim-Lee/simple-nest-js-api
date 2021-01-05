import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { PatchPodcastDto } from './dto/patch-podcast.dto';
import { PatchEpisodeDto } from './dto/patch-episode.dto';

@Controller('podcasts')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Get()
  podcasts() {
    return this.podcastService.getAll();
  }

  @Post()
  createPodcast(@Body() podcast: CreatePodcastDto) {
    return this.podcastService.createPodcast(podcast);
  }

  @Get(':id')
  getPodcast(@Param('id') id: number) {
    return this.podcastService.getPodcast(id);
  }

  @Patch(':id')
  patchPodcast(@Param('id') id: number, @Body() patchInfo: PatchPodcastDto) {
    return this.podcastService.patchPodcast(id, patchInfo);
  }

  @Delete(':id')
  deletePodcast(@Param('id') id: number) {
    return this.podcastService.deletePodcast(id);
  }

  @Get(':id/episodes')
  getEpisodes(@Param('id') id: number) {
    return this.podcastService.getEpisodes(id);
  }

  @Post(':id/episodes')
  createEpisode(
    @Param('id') id: number,
    @Body() createEpisode: CreateEpisodeDto,
  ) {
    return this.podcastService.createEpisode(id, createEpisode);
  }

  @Patch(':id/episodes/:episodeId')
  patchEpisode(
    @Param('id') id: number,
    @Param('episodeId') episodeId: number,
    @Body() patchEpisodeDto: PatchEpisodeDto,
  ) {
    return this.podcastService.patchEpisode(id, episodeId, patchEpisodeDto);
  }

  @Delete(':id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') id: number,
    @Param('episodeId') episodeId: number,
  ) {
    return this.podcastService.deleteEpisode(id, episodeId);
  }
}
