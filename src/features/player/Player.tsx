import PlayButton from "./PlayButton";

import { PlaybackStateType } from "../spotify/entities";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import * as T from "@/components/Typography"; 

type PlayerProps = {
  playbackState: PlaybackStateType | null,
  onResume: () => void,
  onPause: () => void,
  onTrackFinish: () => void,
}

const displayTime = (ms?: number | null) => {
  if (ms === undefined || ms === null) return '0:00'

  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`
}

export default function Player({ playbackState, onResume, onPause, onTrackFinish }: PlayerProps) {
  const [currentProgressMs, setCurrentProgressMs] = useState<number>(0);

  const trackDurationMs = playbackState?.track.durationMs ?? 0
  const progressPercent = trackDurationMs === 0 ? 0 : (currentProgressMs / trackDurationMs) * 100 

  useEffect(() => {
    if (currentProgressMs >= trackDurationMs) {
      onTrackFinish()
    }
    if (playbackState?.playing) {
      const interval = setInterval(() => {
        setCurrentProgressMs((prev) => prev + 1000)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [playbackState?.playing, currentProgressMs, trackDurationMs, onTrackFinish])

  useEffect(() => {
    setCurrentProgressMs(playbackState?.progressMs ?? 0)
  }, [playbackState?.progressMs])


  return (
    <>
      <section className="flex gap-lg items-center">
        <PlayButton onResume={onResume} onPause={onPause} playing={playbackState?.playing ?? false} />
        <section className="grow">
          <T.Large>{playbackState?.track.name}</T.Large>
          <T.Small>{playbackState?.track.artists?.join(', ')} </T.Small>
          <T.Muted>{playbackState?.track.album}</T.Muted>
          <section className="flex items-center">
            <Progress value={progressPercent} className="grow" />
            <T.Muted>
              {displayTime(currentProgressMs)}/{displayTime(trackDurationMs)}
            </T.Muted>
          </section>
        </section>
      </section>
    </>
  )
}