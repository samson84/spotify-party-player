import { Button } from "@/components/ui/button";
import { CirclePause, CirclePlay } from "lucide-react";

type PlayButtonProps = {
  onPause: () => void,
  onResume: () => void,
  playing: boolean
}

export default function PlayButton({onPause, onResume, playing} : PlayButtonProps) {
  
  return (
    playing 
      ? <Button 
          variant='ghost'
          size='large-icon'
          onClick={onPause}
        >
          <CirclePause className="h-24 w-24"/>
        </Button>
      : <Button 
        variant='ghost'
        size='large-icon'
        onClick={onResume}
        >
          <CirclePlay className="h-24 w-24"/>
        </Button>
        
  )

}