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
import { HomeSwitcher } from "@/features/sidebar/home-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useHomeStore } from "@/store/home";
import { useEffect, useState } from "react";
import { userAuthStore } from "@/store/userAuth";

export function AppSidebar({ ...props }) {
  const { homes, currentHome, fetchHomeByUserId, setCurrentHome } =
    useHomeStore();

  const { user, isAuthenticated } = userAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await fetchHomeByUserId("67ad62846b0327d660ea0494");
      await setCurrentHome("67b318f5d25d38aa0439d87a");
      setLoading(false); // Mark data as ready
    }

    fetchData();
  }, [fetchHomeByUserId, setCurrentHome]);

  if (loading) {
    return <div>Loading...</div>; // Or a skeleton UI
  }

  console.log(currentHome.rooms);

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
        <HomeSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
