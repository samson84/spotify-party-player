import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TrackType } from "../spotify/track"
import { Badge } from "@/components/ui/badge"

type QueueListProps = { queue: TrackType[] }

export default function QueueList({queue: tracks}: QueueListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Track</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Album</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          tracks.map((track, index) => (
            <TableRow key={track.id}>
              <TableCell>{index===0 && <Badge variant='outline'>Next</Badge>}{" "}{track.name}</TableCell>
              <TableCell>{track.artists?.join(', ')}</TableCell>
              <TableCell>{track.album}</TableCell>
            </TableRow>
          ))
        
        }
      </TableBody>
    </Table>
  )
}