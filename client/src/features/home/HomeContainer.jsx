import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/sidebar/app-sidebar";
import Header from "../header/Header";
import WelcomeUser from "../dashboard/components/WelcomeUser";
import { userAuthStore } from "@/store/userAuth";
import { useHomeStore } from "@/store/home";
import BentoGrid from "../dashboard/components/BentoGrid";
import RoomScrollArea from "../dashboard/components/RoomScrollArea";
import Dashboard from "../dashboard/Dashboard";
import RoomPage from "../rooms/RoomPage";
import { useState } from "react";

const HomeContainer = ({ mode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode); // Track current mode

  const { user } = userAuthStore();
  const { currentHome } = useHomeStore();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-[#EFEFEF] overflow-hidden w-full">
        {currentMode === "dashboard" ? (
          <Dashboard />
        ) : currentMode === "room" ? (
          <RoomPage />
        ) : null}
      </main>
    </SidebarProvider>
  );
};

export default HomeContainer;
