import * as T from '@/components/Typography'
import useSettings from './useSettings'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import SelectDevice from './SelectDevice'
import SelectPlaylist from './SelectPlaylist'

export default function SettingPage() {
  const { settings, update } = useSettings()

  return (
    <div className='flex flex-col gap-lg h-full items-center justify-center'>
      <T.H3>Settings</T.H3>

      <section>
        <Input
          label='Playlist'
          value={settings?.playlist?.name ?? ''}
          button={<SelectPlaylist onSelect={(playlist) => update('playlist', playlist)} />}
          disabled={true}
          placeholder={settings?.playlist ? '' : 'No playlist selected'}
        />
      </section>

      <section>
        <Input
          label='Device'
          value={settings?.device?.name ?? ''}
          button={<SelectDevice onSelect={(device) => update('device', device)} />}
          disabled={true}
          placeholder={settings?.device ? '' : 'No device selected'}
        />
      </section>
      <section>
        <Button variant='outline'>Change PIN</Button>
      </section>

    </div>
  )
}
