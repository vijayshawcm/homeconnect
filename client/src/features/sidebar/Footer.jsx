import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { userAuthStore } from "@/store/userAuth";
import { LogOut } from "lucide-react";

const Footer = () => {
  const { logoutUser } = userAuthStore();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="text-xl font-light h-16 transition-all duration-500"
        onClick={logoutUser}
      >
        <LogOut />
        <span>Log Out</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default Footer;
