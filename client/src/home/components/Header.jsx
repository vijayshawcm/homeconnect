import { SidebarTrigger } from "@/components/ui/sidebar";
import CustomSideBarTrigger from "./CustomSideBarTrigger";
import { HeaderInput } from "./HeaderInput";
import { Avatar } from "@/components/ui/avatar";
import HeaderAvatar from "./HeaderAvatar";

const Header = () => {
  return (
    <div className="flex p-6 justify-between bg-[#FFFFFF]">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center justify-center gap-6">
        <HeaderInput />
        <HeaderAvatar />
      </div>
    </div>
  );
};

export default Header;
