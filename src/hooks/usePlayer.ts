import { useEffect, useState } from "react";
import useSpotify from "../spotify/useSpotify";
import { TrackItem } from "@spotify/web-api-ts-sdk";

type UsePlayerParams = {
  deviceId: string;
};

export default function usePlayer({ deviceId }: UsePlayerParams) {
  const [queue, setQueue] = useState<TrackItem[]>([]);
  const {sdk} = useSpotify()

  useEffect(() => {
    (async () => {
      const response = await sdk?.player.getUsersQueue()
      setQueue(response?.queue ?? [])
    })()
  }, [sdk])
  

  async function play(tracks: string[]) {
    await sdk?.player.startResumePlayback(deviceId, undefined, tracks)
  }

  async function resume() {
    await sdk?.player.startResumePlayback(deviceId)
  }

  async function stop() {
    await sdk?.player.pausePlayback(deviceId)
  }

  async function enqueue(track: string) {
    await sdk?.player.addItemToPlaybackQueue(track)
    const response = await sdk?.player.getUsersQueue()
    setQueue(response?.queue ?? [])
  }

  return {play, stop, enqueue, queue, resume}
}