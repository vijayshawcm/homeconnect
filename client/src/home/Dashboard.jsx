import AppSidebar from "./components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./components/Header";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-[#EFEFEF]">
        <Header />
        <div className="flex w-full flex-col gap-3 text-4xl font-semibold font-['Inter'] px-10 py-8">
          <h1 className="">Welcome Home,</h1>
          <h1 className="">User!</h1>
        </div>
      </main>
    </SidebarProvider>
  );
}
