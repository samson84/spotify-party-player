import { Card, CardContent } from "@/components/ui/card";
import { TrackType } from "../spotify/track";
import * as T from "@/components/Typography";
import { Button } from "@/components/ui/button";

type SearchedTrackProps = {
  track: TrackType,
  onEnqueue: (trackUri: string) => void,
}

export default function SearchedTrack({ track, onEnqueue }: SearchedTrackProps) {
  return (
    <Card className="hover:bg-accent">
      <CardContent className="p-md pt-md flex">
        <section className="grow">
          <T.Large>{track.name}</T.Large>
          <T.Small>{track.artists?.join(', ')}</T.Small>
          <T.Muted>{track.album}</T.Muted>
        </section>
        <section>
          <Button variant="outline" onClick={() => onEnqueue(track.uri)}>Enqueue</Button>
        </section>
      </CardContent>
    </Card>
  )

}