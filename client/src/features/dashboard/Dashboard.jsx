import RoomScrollArea from "./components/RoomScrollArea";
import BentoGrid from "./components/BentoGrid";
import { userAuthStore } from "@/store/userAuth";
import WelcomeUser from "./components/WelcomeUser";
import { useHomeStore } from "@/store/home";

export default function Dashboard() {
  const { user } = userAuthStore();
  const { currentHome } = useHomeStore()

  return (
    <div className="flex-1">
      <WelcomeUser user={user} />
      <RoomScrollArea rooms={currentHome.rooms} />
      <BentoGrid />
    </div>
  );
}
