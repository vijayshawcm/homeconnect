import { AppSidebar } from "@/features/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "../header/Header";
import RoomScrollArea from "./components/RoomScrollArea";
import BentoGrid from "./components/BentoGrid";
import { userAuthStore } from "@/store/userAuth";
import WelcomeUser from "./components/WelcomeUser";
import { useHomeStore } from "@/store/home";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = userAuthStore();
  const { currentHome } = useHomeStore()

  return (
    <div>
      <WelcomeUser user={user} />
      <RoomScrollArea rooms={currentHome.rooms} />
      <BentoGrid />
    </div>
  );
}
