import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import HomeLogo from "../../assets/homeconnect-logo-icon.svg";
import HomeText from "../../assets/homeconnect-logo-text.svg";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex justify-center items-center">
        <SidebarMenuButton className="h-16 group-data-[state=collapsed]:!p-0 pointer-events-none gap-2">
          <div className="flex aspect-square size-12 items-center justify-center rounded-lg text-sidebar-primary-foreground group-data-[state=collapsed]:size-8 transition-all duration-500">
            <img src={HomeLogo} className="invert" />
          </div>
          <div className="flex flex-1 justify-center items-center transition-all duration-500">
            <img
              src={HomeText}
              className="invert transition-transform duration-500 group-data-[state=collapsed]:scale-90"
            />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
