import { Outlet } from "react-router-dom";
import AuthInfo from "./AuthInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Layout() {
  return (
    <div className="w-full min-h-screen flex p-lg">
      <Card className="shadow-xl flex-grow">
        <CardHeader>
          <div className="flex items-center">
            <header className="grow">
              <CardTitle>Welcome to the Playlist!</CardTitle>
            </header>
            <nav className="flex">
              <AuthInfo />
            </nav>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <main>
            <Outlet />
          </main>
        </CardContent>
      </Card>
    </div>
  )
}