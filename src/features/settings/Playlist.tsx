import { Card, CardContent } from "@/components/ui/card"
import { PlaylistType } from "../spotify/usePlaylist"
import * as T from "@/components/Typography"
import { Button } from "@/components/ui/button"

type PlaylistProps = {
  playlist: PlaylistType
  onSelect: () => void
}

export default function Playlist({playlist, onSelect}: PlaylistProps) {

  return (
    <Card className="hover:bg-accent">
      <CardContent className="p-md pt-md flex gap-md">
        <section className="grow">
          <T.Large>{playlist.name}</T.Large>
          <T.Muted>{
            playlist.totalTracks 
              ? `Tracks: ${playlist.totalTracks}` 
              : ''
            }
          </T.Muted>
        </section>
        <section>
          <Button variant="outline" onClick={() => onSelect()}>Select</Button>
        </section>
      </CardContent>
    </Card>

  )
}