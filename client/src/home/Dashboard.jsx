import { AppSidebar } from "@/features/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./components/Header";
import DashboardCarousel from "./components/DashboardCarousel";
import BentoGrid from "./components/BentoGrid";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-[#EFEFEF]">
        <Header />
        <div className="p-5 w-full">
          <div className="flex w-full flex-col gap-3 text-4xl font-semibold font-['Inter']">
            <h1 className="">Welcome Home,</h1>
            <h1 className="">User!</h1>
          </div>
          <DashboardCarousel />
          <BentoGrid />
        </div>
      </main>
    </SidebarProvider>
  );
}
