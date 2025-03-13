import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/sidebar/app-sidebar";
import Dashboard from "../dashboard/Dashboard";
import RoomPage from "../rooms/RoomPage";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import { useHomeStore } from "@/store/home";

const HomeContainer = ({ mode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // Track transition state
  const [currentMode, setCurrentMode] = useState(mode); // Track current mode
  const { isLoading } = useHomeStore();

  useEffect(() => {
    // Prevent transition on first render, but allow after mount
    if (!hasMounted) {
      setCurrentMode(mode);
      setHasMounted(true);
      return;
    }
    setIsTransitioning(true); // Start transition
    setTimeout(() => {
      setCurrentMode(mode); // Update mode after transition
      setIsTransitioning(false); // End transition
    }, 150); // Match with transition duration
  }, [hasMounted, setHasMounted, setIsTransitioning, setCurrentMode, mode]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-[#EFEFEF] overflow-hidden w-full flex flex-1 flex-col">
        <Header mode={currentMode} />
        <div
          className={`transition-opacity duration-300 flex flex-col flex-1 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentMode === "dashboard" ? (
            <Dashboard />
          ) : currentMode === "room" ? (
            <RoomPage />
          ) : null}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default HomeContainer;
