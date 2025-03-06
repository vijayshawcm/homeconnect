import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardHeader from "./components/DashboardHeader";
import RoomsHeader from "./components/RoomsHeader";

const Header = ({ mode }) => {
  return (
    <div className="flex py-6 px-4 bg-[#FFFFFF] h-24">
      <div className="flex items-center gap-2 w-full">
        <SidebarTrigger />
        {mode === "dashboard" ? (
          <DashboardHeader />
        ) : mode === "room" ? (
          <RoomsHeader />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
