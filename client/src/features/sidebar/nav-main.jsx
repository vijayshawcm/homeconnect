"use client";

import { ChevronRight } from "lucide-react";
import { BsDoorClosed, BsDoorOpen } from "react-icons/bs";
import "../../styles/index.css";

import {
  ChevronsUpDown,
  Home,
  Sofa,
  BedDouble,
  CookingPot,
  Toilet,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useHomeStore } from "@/store/home";
import { Link } from "react-router-dom";
import { useRoomStore } from "@/store/room";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const buttonClass = "text-xl font-light h-12 transition-all duration-500";

// Map room types to icons
const roomTypeIcons = {
  living_room: Sofa,
  bedroom: BedDouble,
  kitchen: CookingPot,
  bathroom: Toilet,
};

export function NavMain({ items }) {
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
    <SidebarGroup className="gap-6">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-16 transition-all justify-center "
                tooltip="Home"
              >
                <div className="flex flex-1 text-left text-sm leading-tight items-center justify-between transition-opacity group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:duration-100 group-data-[state=collapsed]:delay-0 delay-300 duration-300">
                  <span className="truncate font-light text-2xl">
                    {currentHome ? currentHome.name : "Select a Home"}
                  </span>
                  <ChevronsUpDown className="size-4" />
                </div>
                <Home className="group-data-[state=collapsed]:opacity-100 opacity-0 size-4 absolute transition-opacity duration-300" />
              </SidebarMenuButton>
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
                    You are not part of any home. Join an existing home or
                    create a new one to get started.
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
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarMenu className="gap-8">
        {items.map((item) =>
          item.title.toLowerCase() === "rooms" ? (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem key={item.title}>
                <CollapsibleTrigger asChild key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={buttonClass}
                    key={item.title}
                    onClick={() => {
                      if (!open) {
                        setOpen("expanded");
                      }
                    }}
                  >
                    {/* Switch between open and closed door icons */}
                    <span className="transition-transform duration-300 ">
                      <BsDoorOpen className="hidden group-data-[state=open]/collapsible:block size-4" />
                      <BsDoorClosed className="block group-data-[state=open]/collapsible:hidden size-4" />
                    </span>
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-500 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent">
                  <SidebarMenuSub className="overflow-hidden gap-3">
                    {item.items?.map((subItem, index) => {
                      const IconComponent = roomTypeIcons[subItem.type] || Home;
                      const formattedName = subItem.name.replace(/\s+/g, ""); // Replace spaces with dashes
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link key={subItem.name} to={`/${formattedName}`}>
                            <SidebarMenuSubButton
                              className="navRooms transition-all duration-500 h-9 select-none"
                              style={{ "--delay": `${index * 0.2}s` }}
                              key={subItem.name}
                              onClick={() => {
                                setCurrentRoom(subItem);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent />
                                <span>{subItem.name}</span>
                              </div>
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <Link key={item.title} to={item.url}>
                <SidebarMenuButton
                  key={item.title}
                  className={buttonClass}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
