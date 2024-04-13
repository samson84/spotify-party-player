import { Link, Outlet } from "react-router-dom";
import AuthInfo from "./AuthInfo";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CassetteTape, Settings } from "lucide-react";
import { ROUTES } from "./routes";

export default function Layout() {
  return (
    <div className="w-full h-screen p-lg flex flex-col">
      <Card className="shadow-xl flex-grow flex flex-col">
        <CardContent className="flex-grow p-lg pt-lg">
          <main className="h-full">
            <Outlet />
          </main>
        </CardContent>
        <Separator />
        <CardFooter className="flex-none flex flex-row justify-end pt-md p-md gap-md">
          <Link to={ROUTES.HOME}><Button variant='ghost' title="Player"><CassetteTape /></Button></Link>
          <Link to={ROUTES.SETTING}><Button variant='ghost' title="Setting"><Settings /></Button></Link>
          <AuthInfo />
        </CardFooter>
      </Card>
    </div>
  )
}