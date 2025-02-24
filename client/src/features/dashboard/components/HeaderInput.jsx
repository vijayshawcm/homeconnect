import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export const HeaderInput = () => {
  return (
    <div className="flex items-center justify-center rounded-3xl overflow-hidden p-1 bg-[#F7F7F8] shadow-sm">
      <Search />
      <Input
        className="w-64 rounded-3xl border-0 placeholder:text-muted-foreground disabled:cursor-not-allowed shadow-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium"
        placeholder="Search rooms, appliances..."
      />
    </div>
  );
};
