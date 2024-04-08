import { useCallback, useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import {TrackType, mapTrack } from "./track";
import { PlaybackState, Queue } from "@spotify/web-api-ts-sdk";

export type PlaybackStateType = {
  track: TrackType,
  playing: boolean,
  progressMs: number | null,
};

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

type UsePlayerParams = {
  deviceId: string;
};

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