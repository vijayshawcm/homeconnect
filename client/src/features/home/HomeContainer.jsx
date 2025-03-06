import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/sidebar/app-sidebar";
import Dashboard from "../dashboard/Dashboard";
import RoomPage from "../rooms/RoomPage";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import { useHomeStore } from "@/store/home";

const HomeContainer = ({ mode }) => {
  const [currentMode, setCurrentMode] = useState(mode); // Track current mode
  const {isLoading} = useHomeStore()

  useEffect(() => {
    setCurrentMode(mode);
    
  }, [setCurrentMode, mode]);

  if (!isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-[#EFEFEF] overflow-hidden w-full flex flex-col">
        <Header mode={currentMode}/>
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
