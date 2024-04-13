import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useEffect, useState } from "react"
import { CircleX } from "lucide-react"


type DrawerProps = {
  triggerLabel: string,
  title: string,
  description: string,
  children: (close: () => void) => JSX.Element 
}

export default function CustomDrawer({ triggerLabel, title, description, children }: DrawerProps) {
  const [open, setOpen] = useState(false);


  useEffect(() => {
    function escapeHandler(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', escapeHandler);
    return () => window.removeEventListener('keydown', escapeHandler);
  })

  function close() {
    setOpen(false);
  }
  
  return (
    <Drawer open={open}>
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <DrawerContent className="h-[90%]">
        <DrawerHeader className="flex">
          <div className="flex-grow">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </div>
          <div className="">
            <Button variant="ghost" onClick={() => setOpen(false)}><CircleX /></Button>
          </div>
        </DrawerHeader>
        {children(close)}
      </DrawerContent>
    </Drawer>
  )
}
