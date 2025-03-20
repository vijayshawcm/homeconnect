import RoomScrollArea from "./components/RoomScrollArea";
import BentoGrid from "./components/BentoGrid";
import { userAuthStore } from "@/store/userAuth";
import WelcomeUser from "./components/WelcomeUser";
import { useHomeStore } from "@/store/home";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = userAuthStore();
  const { homes, currentHome, updateHome } = useHomeStore();

  useEffect(() => {
    if (currentHome?._id) {
      updateHome();
    }
  }, [currentHome?._id, updateHome]);
  console.log(currentHome);
  return (
    <div className="flex-1 py-4">
      <WelcomeUser user={user.fullName} />
      <RoomScrollArea rooms={currentHome.rooms} />
      <BentoGrid />
    </div>
  );
}
