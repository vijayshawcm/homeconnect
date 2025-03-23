import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeaderAvatar from "./HeaderAvatar";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Home, LayoutDashboard } from "lucide-react";
import { useRoomStore } from "@/store/room";
import { useNavigate } from "react-router-dom";
import { useHomeStore } from "@/store/home";
import { useSidebar } from "@/components/ui/sidebar";

const DashboardHeader = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { currentHome, homes, setCurrentHome } = useHomeStore();
  const { ownedHomes, dwelledHomes } = homes;
  const { currentRoom, setCurrentRoom } = useRoomStore();
  const { open, setOpen } = useSidebar();
  const handleSwitchHome = (homeId) => {
    setCurrentHome(homeId);
    navigate("/dashboard");
  };

  const homeless =
    ownedHomes.filter((home) => home._id !== currentHome?._id).length === 0 &&
    dwelledHomes.filter((home) => home._id !== currentHome?._id).length === 0;
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-1/2 w-1/2 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        </div>
      </div>
      <HeaderAvatar />
    </div>
  );
};

export default DashboardHeader;
