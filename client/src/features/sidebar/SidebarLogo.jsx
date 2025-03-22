import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import HomeLogo from "../../assets/homeconnect-logo-icon.svg";
import HomeText from "../../assets/homeconnect-logo-text.svg";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex justify-center items-center">
        <SidebarMenuButton
          className="h-16 group-data-[state=collapsed]:!p-0 gap-2 duration-500 pointer-events-none"
        >
          <div className="flex aspect-square size-12 items-center justify-center rounded-lg text-sidebar-primary-foreground group-data-[state=collapsed]:size-8 transition-all duration-500 ">
            <img src={HomeLogo} className="invert hover:invert-0" />
          </div>
          <div className="flex flex-1 justify-center items-center transition-all duration-500">
            <img
              src={HomeText}
              className="invert delay-500 transition-all duration-500 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:-translate-x-10"
            />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
