"use client";

import { ChevronRight } from "lucide-react";
import "../../styles/index.css";

import {
  ChevronsUpDown,
  Home,
  Sofa,
  BedDouble,
  CookingPot,
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

import { useSidebar } from "@/components/ui/sidebar";
import { useHomeStore } from "@/store/home";
import { Link } from "react-router-dom";

const buttonClass = "text-xl font-light h-12 transition-all duration-500";

// Map room types to icons
const roomTypeIcons = {
  living_room: Sofa,
  bedroom: BedDouble,
  kitchen: CookingPot,
};

export function NavMain({ items }) {
  const { currentHome, homes, setCurrentHome } = useHomeStore();
  const { state, setOpen } = useSidebar();
  const { isMobile } = useSidebar();
  const { ownedHomes, dwelledHomes } = homes;

  return (
    <SidebarGroup className="gap-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-16 transition-all duration-500"
              >
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-normal text-2xl">
                    {currentHome ? currentHome.name : "Select a Home"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={"right"}
              align="start"
              sideOffset={4}
            >
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
                {ownedHomes.map((home) => (
                  <DropdownMenuItem
                    key={home._id}
                    className="gap-2 p-2"
                    onClick={() => setCurrentHome(home._id)}
                  >
                    {home.name}
                  </DropdownMenuItem>
                ))}
                {dwelledHomes.map((home) => (
                  <DropdownMenuItem
                    key={home._id}
                    className="gap-2 p-2"
                    onClick={() => setCurrentHome(home._id)}
                  >
                    {home.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarMenu className="gap-8">
        {items.map((item) =>
          item.title.toLowerCase() === "rooms" ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={buttonClass}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-500 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent">
                  <SidebarMenuSub className="overflow-hidden gap-3">
                    {item.items?.map((subItem, index) => {
                      const IconComponent = roomTypeIcons[subItem.type] || Home;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link>
                            <SidebarMenuSubButton
                              className="navRooms transition-all duration-500 h-9 select-none"
                              style={{ "--delay": `${index * 0.2}s` }}
                              key={subItem.name}
                            >
                              <a
                                href={subItem.url}
                                className="flex items-center gap-3"
                              >
                                <IconComponent />
                                <span>{subItem.name}</span>
                              </a>
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
              <SidebarMenuButton tooltip={item.title} className={buttonClass}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
