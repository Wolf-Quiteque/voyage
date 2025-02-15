'use client';

import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Menu,
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  ClipboardList,
  BookOpenCheck,
  Warehouse,
  Receipt,
  Calendar,
  ChefHat,
  BadgeDollarSign,
  UsersRound,
  MessagesSquare,
  Bell,
  FileBarChart,
  Settings,  UserCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/supabse/queries";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control sheet open/close

  const [currentTime, setCurrentTime] = useState('');

  const handleLinkClick = () => {
    setIsSheetOpen(false); // Close the sheet when a link is clicked
  };
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard" },
    { icon: UtensilsCrossed, label: "Tables & Orders", link: "/orders" },
    { icon: ClipboardList, label: "Menu Management", link: "/menu" },
    { icon: BookOpenCheck, label: "Reservations", link: "/reservations" },
    { icon: ChefHat, label: "Kitchen Display", link: "/kitchen" },
    { icon: Warehouse, label: "Inventory", link: "/inventory" },
    { icon: Receipt, label: "Billing & Payments", link: "/billing" },
    { icon: Calendar, label: "Staff Managment", link: "/staff" },
    // { icon: BadgeDollarSign, label: "Financial Reports", link: "/finance" },
    { icon: Users, label: "Customer Database", link: "/customer" },
    // { icon: MessagesSquare, label: "Customer Feedback", link: "/feedback" },
    // { icon: Bell, label: "Notifications", link: "/notifications" },
    // { icon: FileBarChart, label: "Analytics", link: "/analytics" },
    { icon: Settings, label: "Settings", link: "/settings" },
  ];


  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
      }));
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 flex items-center justify-between bg-white shadow-sm">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle className="text-2xl">YM</SheetTitle>
          </SheetHeader>
          
          <nav className="flex flex-col gap-2 mt-8 overflow-y-auto max-h-[calc(100vh-180px)]">
            {menuItems.map((item, index) => (
              <Link href={item.link} onClick={handleLinkClick} key={index}>
             
              <Button
                key={index}
                variant="ghost"
                className="justify-start h-12 hover:bg-blue-50"
              >
                <item.icon className="mr-3 h-5 w-5 text-blue-600" />
                {item.label}
              </Button>
              </Link>
            ))}
            
            <div className="mt-4 pt-4 border-t">
              <Button
                 onClick={() => { handleLinkClick(); }} // Close on logout too
                 v
                variant="ghost"
                className="justify-start h-12 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
     {/* Center section with title */}
     <h1 className="text-xl font-bold text-center">YM Restaurant Manager</h1>

{/* Right section with user info, time and logout */}
<div className="flex items-center gap-4">
  <div className="text-sm text-gray-600 hidden sm:block">
    {currentTime}
  </div>
  
  <div className="flex items-center gap-2">
    <UserCircle className="h-5 w-5 text-gray-600" />
    <span className="text-sm font-medium hidden sm:block">John Doe</span>
  </div>

  <Button 
    onClick={logoutUser} 
    variant="ghost" 
    size="icon"
    className="text-red-600 hover:text-red-700 hover:bg-red-50"
  >
    <LogOut className="h-5 w-5" />
  </Button>
</div>
</div>
  );
}