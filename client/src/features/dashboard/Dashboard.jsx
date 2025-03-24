import RoomScrollArea from "./components/RoomScrollArea";
import BentoGrid from "./components/BentoGrid";
import { userAuthStore } from "@/store/userAuth";
import WelcomeUser from "./components/WelcomeUser";
import { useHomeStore } from "@/store/home";
import { useEffect } from "react";
import { Toaster } from "sonner"

export default function Dashboard() {
  const { user } = userAuthStore();
  const { currentHome, updateHome } = useHomeStore();

  useEffect(() => {
    if (currentHome?._id) {
      updateHome();
    }
  }, [currentHome?._id, updateHome]);
  return (
    <>
      <div className="flex-1 py-4">
        <WelcomeUser user={user.fullName} />
        <RoomScrollArea rooms={currentHome.rooms} />
        <BentoGrid />
      </div>
      <Toaster position="bottom-right" richColors closeButton={true} />
    </>
    
  );
}
