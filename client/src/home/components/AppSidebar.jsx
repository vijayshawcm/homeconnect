import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BedDouble,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";
import HomeConnectLogo from "../../assets/homeconnect-logo.svg";

const items = [
  {
    title: "Dashboard",
    url: "",
    icon: LayoutDashboard,
  },
  {
    title: "Rooms",
    url: "",
    icon: BedDouble,
  },
  {
    title: "Energy",
    url: "",
    icon: Zap,
  },
  {
    title: "Settings",
    url: "",
    icon: Settings,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar className="p-10 bg-[#0D1B2A] text-white">
      <SidebarHeader className="invert">
        <img src={HomeConnectLogo}></img>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup className="top-20">
          <SidebarGroupContent>
            <SidebarMenu className="gap-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-2xl h-100 font-[Inter] font-extralight"
                  >
                    <a href={item.url} className="gap-5 items-center">
                      <item.icon className="!w-6 !h-6" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-2xl">
        <a href="" className="flex items-center gap-4">
          <LogOut className="scale-x-[-1]" />{" "}
          <span className="font-extralight">Logout</span>
        </a>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
