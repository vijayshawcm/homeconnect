import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sampleAvatar from "../../../assets/sampleAvatar.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userAuthStore } from "@/store/userAuth";
import { Bell, ChevronsUpDown, Home, UserRound, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";

const HeaderAvatar = () => {
  const { user } = userAuthStore();
  const navigate = useNavigate(); // Initialize navigate
  const { currentHome, homes, setCurrentHome } = useHomeStore();
  const { ownedHomes, dwelledHomes } = homes;
  const { currentRoom, setCurrentRoom } = useRoomStore();
  const handleSwitchHome = (homeId) => {
    setCurrentHome(homeId);
    navigate("/dashboard");
  };

  const homeless =
    ownedHomes.filter((home) => home._id !== currentHome?._id).length === 0 &&
    dwelledHomes.filter((home) => home._id !== currentHome?._id).length === 0;
  return (
    <div className="flex justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={sampleAvatar}></AvatarImage>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={sampleAvatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.fullName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to={"/profile"}>
              <DropdownMenuItem>
                <UserRound />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link to={"/permissions"}>
              <DropdownMenuItem>
                <Users />
                Management
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderAvatar;
