import { Injectable } from '@nestjs/common';
import { Podcast } from './entities/podcast.entity';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { PatchPodcastDto } from './dto/patch-podcast.dto';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { Episode } from './entities/episode.entity';
import { PatchEpisodeDto } from './dto/patch-episode.dto';
import { isNumber } from 'class-validator';
let increaseId = 0;

@Injectable()
export class PodcastService {
  podcasts: Podcast[] = [];

  getAll() {
    return this.podcasts;
  }

  createPodcast(podcast: CreatePodcastDto) {
    this.podcasts.push({
      ...podcast,
      id: increaseId++,
      episodes: [],
    });
    return podcast;
  }

  getPodcast(id: number) {
    return this.podcasts.find((podcast) => podcast.id === id) || null;
  }

  patchPodcast(id: number, patchInfo: PatchPodcastDto) {
    const podcastIndex = this.podcasts.findIndex(
      (podcast) => podcast.id === id,
    );
    if (podcastIndex < 0) {
      return false;
    }
    this.podcasts[podcastIndex] = {
      ...this.podcasts[podcastIndex],
      ...patchInfo,
    };
    return true;
  }

  deletePodcast(id: number) {
    const podcastIndex = this.podcasts.findIndex(
      (podcast) => podcast.id === id,
    );

    if (podcastIndex < 0) {
      return false;
    }

    this.podcasts.splice(podcastIndex, 1);
    return true;
  }

  getEpisodes(id: number) {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    return podcast?.episodes || 'null';
  }

  createEpisode(id: number, { content }: CreateEpisodeDto) {
    const podcast = this.getPodcast(id);
    if (!podcast) {
      return false;
    }
    const newEpisode = { id: increaseId++, content };
    podcast.episodes.push(newEpisode);
    return newEpisode;
  }

  patchEpisode(
    id: number,
    episodeId: number,
    patchEpisodeDto: PatchEpisodeDto,
  ) {
    const podcast = this.getPodcast(id);
    if (!podcast) {
      return false;
    }

    const episodeIndex = podcast.episodes.findIndex(
      (episode) => episode.id === episodeId,
    );

    if (episodeIndex < 0) {
      return false;
    }

    const newEpisode = {
      ...podcast.episodes[episodeIndex],
      content: patchEpisodeDto.content,
    };

    if (
      patchEpisodeDto.movePodcastId !== undefined &&
      isNumber(patchEpisodeDto.movePodcastId)
    ) {
      const newPodcast = this.getPodcast(patchEpisodeDto.movePodcastId);
      if (!newPodcast) {
        return false;
      }
      newPodcast.episodes.push(newEpisode);
      podcast.episodes.splice(episodeIndex, 1);
    } else {
      podcast.episodes[episodeIndex] = newEpisode;
    }

    return true;
  }

  deleteEpisode(id: number, episodeId: number) {
    const podcast = this.getPodcast(id);
    if (!podcast) {
      return false;
    }

    const episodeIndex = podcast.episodes.findIndex(
      (episode) => episode.id === episodeId,
    );

    if (episodeIndex < 0) {
      return false;
    }

    podcast.episodes.splice(episodeIndex, 1);
    return true;
  }
}
