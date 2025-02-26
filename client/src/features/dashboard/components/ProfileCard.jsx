import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import sampleAvatar from "../../../assets/sampleAvatar.png";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ProfileCard = () => {
  return (
    <Card className="bg-white p-4 flex flex-col justify-end gap-8 rounded-3xl">
      <h1 className="font-semibold text-2xl">Profiles</h1>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex flex-1 gap-10 selection:items-center w-full ">
          <Avatar className="size-20 lg:size-28">
            <AvatarImage src={sampleAvatar}></AvatarImage>
          </Avatar>
          <Avatar className="size-20 lg:size-28">
            <AvatarImage src={sampleAvatar}></AvatarImage>
          </Avatar>
          <Avatar className="size-20 lg:size-28">
            <AvatarImage src={sampleAvatar}></AvatarImage>
          </Avatar>
          <Avatar className="size-20 lg:size-28">
            <AvatarImage src={sampleAvatar}></AvatarImage>
          </Avatar>
        </div>
        <ScrollBar orientation = "horizontal"/> 
      </ScrollArea>
    </Card>
  );
};

export default ProfileCard;
