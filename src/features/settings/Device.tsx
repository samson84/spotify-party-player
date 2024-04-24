import { Card, CardContent } from "@/components/ui/card"
import { DeviceType } from "../spotify/useDevice"
import * as T from "@/components/Typography"
import { Button } from "@/components/ui/button"
import { Laptop, MonitorSmartphone, Smartphone, Speaker, Tv } from "lucide-react"

type DeviceProps = {
  device: DeviceType
  onSelect: (device: DeviceType) => void
  disabled: boolean
}

export default function Device({ device, onSelect, disabled }: DeviceProps) {
  const icon = {
    computer: <Laptop />,
    smartphone: <Smartphone />,
    speaker: <Speaker />,
    tv: <Tv />,
  }[device.type.toLocaleLowerCase()] ?? <MonitorSmartphone />

  const disabledClass = device.restricted || disabled 
    ? 'opacity-50' 
    : ''

  return (
    <Card 
      className={`hover:bg-accent ${disabledClass}`}
      title={device.restricted ? 'This device is restricted, you can not select it' : ''}
    >
      <CardContent className="p-md pt-md flex">
        <section className="grow flex gap-md">
          <div>
            {icon}
          </div>
          <div>
            <T.Large>
              {device.name}
              {device.restricted && <span title="Restricted"> 🔒</span>}
              {device.active && <span title="This device is active"> 🎶</span>}
            </T.Large>
            <T.Small>
              {device.type}
            </T.Small>
          </div>
        </section>
        <section>
          <Button 
            variant="outline" 
            disabled={device.restricted || disabled} 
            onClick={() => onSelect(device)}
          >
            Change
          </Button>
        </section>
      </CardContent>
    </Card>
  )
}