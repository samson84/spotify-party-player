import { useCallback, useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import { PlaybackStateType, TrackType, mapPlaybackState, mapQueue } from "./entities";

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