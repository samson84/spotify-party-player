import { useEffect, useState } from "react"


function createStorage<T>(key: string, defaultValue: T) {
  return {
    get() {
      const item = localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      } else {
        defaultValue
      }
    },
    set(value: T) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
} 

type SettingsType = {
  playlist?: {
    id: string,
    name: string
  },
  device?: {
    id: string,
    name: string,
  },
}

const defaultSettings: SettingsType = {
  playlist: undefined,
  device: undefined,
}

const storage = createStorage<SettingsType>('settings', defaultSettings);

export default function useSettings() {
  const [settings, setSettings] = useState<SettingsType | null>(null)

  useEffect(() => {
    setSettings(storage.get())
  }, [])

  function updateSetting<K extends keyof SettingsType>(setting: K, value: SettingsType[K]) {
    storage.set({ ...settings, [setting]: value })
  }

  return {settings, updateSetting}

}