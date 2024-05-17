import { useCallback } from "react";
import useSpotify from "./useSpotify";
import useErrorHandler from "@/hooks/useErrorHandler";
import { Devices } from "@spotify/web-api-ts-sdk";
import useData from "@/hooks/useData";

export type DeviceType = {
  id: string | null,
  name: string,
  type: string,
  active: boolean,
  restricted: boolean
}

function mapDevices(devices: Devices): DeviceType[] {
  return devices.devices.map(device => ({
    id: device.id,
    name: device.name,
    type: device.type,
    active: device.is_active,
    restricted: device.is_restricted,
  }));
}

export default function useDevice() {
  const { sdk } = useSpotify();

  const getDevices = useCallback(async () => {
      if (!sdk) {
        return null;
      }
      return mapDevices(await sdk.player.getAvailableDevices());
  }, [sdk]);
  const getDevicesWithErrorHandling = useErrorHandler({ fetcher: getDevices });
  const { data: devices, loading, refetch } = useData({ action: getDevicesWithErrorHandling });

  const transfer = useCallback(async (id: DeviceType['id']) => {
    if (!sdk || !id) {
      return null;
    }
    await sdk.player.transferPlayback([id])
  }, [sdk])
  const transfetWithErrorHandling = useErrorHandler<void, [DeviceType['id']]>({ fetcher: transfer });
  
  return {
    devices,
    loading,
    transfer: transfetWithErrorHandling,
    refetch
  };
}