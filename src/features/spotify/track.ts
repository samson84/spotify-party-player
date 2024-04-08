import { Track, TrackItem } from "@spotify/web-api-ts-sdk";

export type TrackType = {
  name: string,
  id: string,
  uri: string,
  album?: string,
  durationMs: number,
  artists?: string[],
}

export const mapTrack = (track: TrackItem): TrackType => {
  return {
    name: track.name,
    id: track.id,
    uri: track.uri,
    durationMs: track.duration_ms,
    album: isTrack(track) ? track.album?.name : undefined,
    artists: isTrack(track) ? track.artists?.map((artist) => artist.name) : undefined,
  }
}

export function isTrack(item: TrackItem): item is Track {
  return 'album' in item || 'arists' in item;
}

