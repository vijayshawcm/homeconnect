import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const AddApplianceCard = () => {
  return (
    <Card className="flex flex-1 justify-center items-center rounded-3xl h-full">
      <Plus className="size-12"/>
    </Card>
  );
};
