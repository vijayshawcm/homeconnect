import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderInput } from "./HeaderInput";
import HeaderAvatar from "./HeaderAvatar";

const Header = () => {
  return (
    <div className="flex py-6 px-4 justify-between bg-[#FFFFFF]">
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
