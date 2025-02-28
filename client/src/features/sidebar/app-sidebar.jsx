import * as React from "react";
import {
  AudioWaveform,
  BedDouble,
  Home,
  Command,
  Zap,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings2,
  Sofa,
  CookingPot,
} from "lucide-react";

import { NavMain } from "@/features/sidebar/nav-main";
import { SidebarLogo } from "./SidebarLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useHomeStore } from "../../store/home";
import { useEffect, useState } from "react";
import { userAuthStore } from "@/store/userAuth";

export function AppSidebar({ ...props }) {
  const { homes, currentHome } = useHomeStore();
  // This is sample data.
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    homes: homes,
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Rooms",
        url: "#",
        icon: Home,
        items: currentHome.rooms,
      },
      {
        title: "Energy",
        url: "#",
        icon: Zap,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
