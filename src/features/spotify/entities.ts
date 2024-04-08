import { PlaybackState, Queue, Track, TrackItem } from "@spotify/web-api-ts-sdk";

export type TrackType = {
  name: string,
  id: string,
  uri: string,
  album?: string,
  durationMs: number,
  artists?: string[],
}

export type PlaybackStateType = {
  track: TrackType,
  playing: boolean,
  progressMs: number | null,
};


const mapTrack = (track: TrackItem): TrackType => {
  return {
    name: track.name,
    id: track.id,
    uri: track.uri,
    durationMs: track.duration_ms,
    album: isTrack(track) ? track.album?.name : undefined,
    artists: isTrack(track) ? track.artists?.map((artist) => artist.name) : undefined,
  }
}

export const mapPlaybackState = (playbackState?: PlaybackState): PlaybackStateType | null => {
  if (!playbackState) { return null; }

  return {
    track: mapTrack(playbackState.item),
    playing: playbackState.is_playing,
    progressMs: playbackState.progress_ms,
  }
}

export const mapQueue = (queue?: Queue): TrackType[] => {
  if (queue?.queue === undefined) return [];
  return queue.queue.map(mapTrack) 
}

function isTrack(item: TrackItem): item is Track {
  return 'album' in item || 'arists' in item;
}
