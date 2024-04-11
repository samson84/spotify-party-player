import { Outlet } from "react-router-dom";
import AuthInfo from "./AuthInfo";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Layout() {
  return (
    <div className="w-full h-screen p-lg flex flex-col">
      <Card className="shadow-xl flex-grow flex flex-col">
        <CardContent className="flex-grow">
          <main>
            <Outlet />
          </main>
        </CardContent>
        <Separator />
        <CardFooter className="flex-none flex flex-row justify-end pt-md p-md">
          <AuthInfo />
        </CardFooter>
      </Card>
    </div>
  )
}