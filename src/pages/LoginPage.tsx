import useSpotify from "../spotify/useSpotify"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const { login } = useSpotify();

  return (
    <main className="h-screen flex items-center flex-col sm:flex-row ">
      <section className="flex sm:flex-1 flex-col justify-center items-center bg-primary h-3/5 sm:h-full w-full">
        <h1 className="text-sm-hero sm:text-hero text-background">The Party Player</h1>
      </section>
      <section className="flex sm:flex-1 flex-col justify-center items-center gap-lg h-full w-full">
        <p>You need to log in to access the player</p>
        <Button onClick={login} variant="default">🔑 Login with Spotify</Button>
      </section>
    </main>
  )
}