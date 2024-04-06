import { Outlet } from "react-router-dom";
import AuthInfo from "./AuthInfo";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Layout() {
  return (
    <div className="w-full min-h-screen flex p-lg">
      <Card className="shadow-xl flex-grow">
        <CardContent>
          <main>
            <Outlet />
          </main>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-row justify-end pt-md">
          <AuthInfo />
        </CardFooter>
      </Card>
    </div>
  )
}