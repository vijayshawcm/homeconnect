import * as React from "react";
import { ChevronsUpDown, Home, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import HomeLogo from "../assets/homeconnect-logo-icon.svg";
import HomeText from "../assets/homeconnect-logo-text.svg";
import { useHomeStore } from "@/store/home";

export function HomeSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex justify-center items-center">
        <SidebarMenuButton className="h-16 group-data-[state=collapsed]:!p-0 pointer-events-none gap-2">
          <div className="flex aspect-square size-12 items-center justify-center rounded-lg text-sidebar-primary-foreground group-data-[state=collapsed]:size-8 transition-all duration-300">
            <img src={HomeLogo} className="invert" />
          </div>
          <div className="flex flex-1 justify-center items-center transition-all duration-500">
            <img src={HomeText} className="invert" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
