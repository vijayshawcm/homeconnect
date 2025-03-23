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
    <div className="flex justify-center items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors border border-input bg-background shadow-sm hover:bg-accent text-black h-9 px-4 py-2 w-[200px] justify-between">
            <Home />
            {currentHome ? currentHome.name : "Select a Home"}
            <ChevronsUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-lg"
          side={"right"}
          align="start"
          sideOffset={4}
        >
          {homeless && (
            <div className="flex flex-col items-center justify-center gap-4 p-4 text-center text-balance">
              <p className="text-md text-muted-foreground">
                You are not part of any home. Join an existing home or create a
                new one to get started.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => navigate("/join-home")} // Navigate to join home page
                  className="bg-[#C2E03A] text-black hover:bg-[#A8C82A]"
                >
                  Join a Home
                </Button>
                <Button
                  onClick={() => navigate("/create-home")} // Navigate to create home page
                  className="bg-[#184C85] text-white hover:bg-[#0D1B2A]"
                >
                  Create a Home
                </Button>
              </div>
            </div>
          )}
          {!homeless && (
            <div>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {currentHome ? currentHome.name : "Select a Home"}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Switch Homes
                </DropdownMenuLabel>
                {ownedHomes
                  .filter((home) => home._id !== currentHome?._id)
                  .map((home) => (
                    <DropdownMenuItem
                      key={home._id}
                      className="gap-2 p-2"
                      onClick={() => handleSwitchHome(home._id)}
                    >
                      {home.name}
                    </DropdownMenuItem>
                  ))}
                {dwelledHomes
                  .filter((home) => home._id !== currentHome?._id)
                  .map((home) => (
                    <DropdownMenuItem
                      key={home._id}
                      className="gap-2 p-2"
                      onClick={() => handleSwitchHome(home._id)}
                    >
                      {home.name}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuGroup>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
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
