import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardHeader from "./components/DashboardHeader";
import RoomsHeader from "./components/RoomsHeader";
import EnergyHeader from "./components/EnergyHeader";
import { Separator } from "@/components/ui/separator";

const Header = ({ mode }) => {
  return (
    <div className="flex py-6 px-4 bg-[#FFFFFF] h-16 border-b">
      <div className="flex items-center gap-2 w-full">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {mode === "dashboard" ? (
          <DashboardHeader />
        ) : mode === "room" ? (
          <RoomsHeader />
        ) : mode === "energy" ? (
          <EnergyHeader />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
