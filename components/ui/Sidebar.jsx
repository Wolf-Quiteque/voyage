"use client"
import { 
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Button } from "@/components/ui/button";
  import { 
    Menu,
    Home,
    Settings,
    History,
    Heart,
    LogOut,
  } from "lucide-react";

  import {logoutUser} from "@/lib/supabse/queries"


export default function Sidebar() {
  return (          <div className="p-4 flex items-center justify-between bg-white shadow-sm">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>Voyage</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Button variant="ghost" className="justify-start">
            <Home className="mr-2 h-5 w-5" />
            Home
          </Button>
          <Button variant="ghost" className="justify-start">
            <History className="mr-2 h-5 w-5" />
            Ride History
          </Button>
          <Button variant="ghost" className="justify-start">
            <Heart className="mr-2 h-5 w-5" />
            Favorites
          </Button>
          <Button variant="ghost" className="justify-start">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button onClick={
            logoutUser} variant="ghost" className="justify-start text-red-600">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
    <h1 className="text-xl font-bold text-center flex-1">Voyage</h1>
    <div className="w-10"></div> {/* Spacer for centering */}
  </div>


  )
}
