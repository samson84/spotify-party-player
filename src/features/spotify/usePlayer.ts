import { useCallback, useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import { PlaybackState, Queue, Track, TrackItem } from "@spotify/web-api-ts-sdk";

type UsePlayerParams = {
  deviceId: string;
};

type TrackType = {
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

const mapPlaybackState = (playbackState?: PlaybackState): PlaybackStateType | null => {
  if (!playbackState) { return null; }

  return {
    track: mapTrack(playbackState.item),
    playing: playbackState.is_playing,
    progressMs: playbackState.progress_ms,
  }
}

const mapQueue = (queue?: Queue): TrackType[] => {
  if (queue?.queue === undefined) return [];
  return queue.queue.map(mapTrack) 
}

function isTrack(item: TrackItem): item is Track {
  return 'album' in item || 'arists' in item;
}


export default function usePlayer({ deviceId }: UsePlayerParams) {
  const [queue, setQueue] = useState<TrackType[]>([]);
  const [playbackState, setPlaybackState] = useState<PlaybackStateType|null>(null);
  const { sdk } = useSpotify()

  const update = useCallback(async () => {
    const [queueResponse, stateResponse] = await Promise.all([
      sdk?.player.getUsersQueue(),
      sdk?.player.getPlaybackState()
    ])
    setQueue(mapQueue(queueResponse));
    setPlaybackState(mapPlaybackState(stateResponse));
  }, [sdk])

  useEffect(() => {
    (async () => {
      await update();
    })()
  }, [sdk, update])


  async function playContext(contextUri: string) {
    await sdk?.player.startResumePlayback(deviceId, contextUri)
    await update();
  }

  async function resume() {
    await sdk?.player.startResumePlayback(deviceId)
    await update();
  }

  async function pause() {
    await sdk?.player.pausePlayback(deviceId)
    await update();
  }

  async function enqueue(track: string) {
    await sdk?.player.addItemToPlaybackQueue(track)
    await update();
  }

  return { playContext, pause, enqueue, queue, playbackState, resume, update }
}