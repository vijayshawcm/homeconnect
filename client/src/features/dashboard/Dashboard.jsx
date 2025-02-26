import { AppSidebar } from "@/features/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./components/Header";
import RoomScrollArea from "./components/RoomScrollArea";
import BentoGrid from "./components/BentoGrid";
import { userAuthStore } from "@/store/userAuth";
import WelcomeUser from "./components/WelcomeUser";
import { useHomeStore } from "@/store/home";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = userAuthStore();
  const { homes, currentHome, fetchHomeByUserId, setCurrentHome } =
    useHomeStore();

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

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-[#EFEFEF] overflow-hidden">
        <Header />
        <WelcomeUser user={user} />
        <RoomScrollArea rooms={currentHome.rooms} />
        <BentoGrid />
      </main>
    </SidebarProvider>
  );
}
