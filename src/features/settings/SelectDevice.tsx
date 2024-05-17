import CustomDrawer from "@/components/CustomDrawer";
import useDevice, { DeviceType } from "../spotify/useDevice";
import Device from "./Device";
import DevicesSkeleton from "./DevicesSkeleton";
import { useCallback, useState } from "react";

type SelectDeviceProps = {
  onSelect: (device: DeviceType) => void
}

export default function SelectDevice({ onSelect }: SelectDeviceProps) {
  const { devices, loading, transfer, refetch } = useDevice();
  const [transfering, setTransfering] = useState(false);

  async function handleTransfer(device: DeviceType) {
    try {
      setTransfering(true)
      await transfer(device.id)
      onSelect(device)
    } finally {
      setTransfering(false)
    }
  }

  const handleOpenChange = useCallback((open: boolean) => {
    open && refetch()
  }, [refetch])

  return (
    <CustomDrawer
      triggerLabel="Change Device"
      triggerVariant="outline"
      description="Changing the device will immediately starts the playing on the new device."
      title="Select Device"
      onOpenChange={handleOpenChange}
    >
      {(close) => (
        <div className="flex flex-col flex-wrap gap-md px-4 overflow-y-auto">
          {loading && <DevicesSkeleton />}
          {devices && !loading && devices.map(device => (
            <Device
              key={device.id}
              device={device}
              disabled={transfering}
              onSelect={async (selectedDevice) => {
                await handleTransfer(selectedDevice)
                close()
              }}
            />
          ))}
        </div>
      )}
    </CustomDrawer>
  )
}