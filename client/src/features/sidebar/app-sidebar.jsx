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
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useHomeStore } from "../../store/home";
import { useEffect, useState } from "react";
import { userAuthStore } from "@/store/userAuth";
import Footer from "./Footer";

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
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Rooms",
        url: "",
        icon: Home,
        items: currentHome.rooms,
        isActive: false,
      },
      {
        title: "Energy",
        url: "/energy",
        icon: Zap,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="group-data-[state=collapsed]:!p-0 group-data-[state=collapsed]:mb-7 transition-all duration-500">
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
