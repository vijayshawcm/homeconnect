import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/sidebar/app-sidebar";
import Dashboard from "../dashboard/Dashboard";
import RoomPage from "../rooms/RoomPage";
import { useEffect, useState } from "react";
import Header from "../header/Header";

const HomeContainer = ({ mode }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode); // Track current mode

  useEffect(() => {
    setCurrentMode(mode);
    
  }, [setCurrentMode, mode]);

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-[#EFEFEF] overflow-hidden w-full">
        <Header />
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
