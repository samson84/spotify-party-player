import * as T from '@/components/Typography'
import useSettings from './useSettings'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'

export default function SettingPage() {
  const { settings } = useSettings()

  return (
    <div className='flex flex-col gap-lg h-full items-center justify-center'>
      <T.H3>Settings</T.H3>

      <section>
        <Input
          label='Playlist'
          value={settings?.playlist?.name ?? ''}
          button={<Button variant='outline'>Change Playlist</Button>}
          disabled={true}
          placeholder={settings?.playlist ? '' : 'No playlist selected'}
        />
      </section>

      <section>
        <Input
          label='Device'
          value={settings?.device?.name ?? ''}
          button={<Button variant='outline'>Change Device</Button>}
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
