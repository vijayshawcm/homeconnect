import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import sampleAvatar from "../../../assets/sampleAvatar.png";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useHomeStore } from "@/store/home";
import { userAuthStore } from "@/store/userAuth";

const ProfileCard = () => {
  const { currentHome } = useHomeStore();
  const { user } = userAuthStore();
  return (
    <Card className="bg-white p-4 flex flex-col justify-end gap-4 lg:gap-8 rounded-3xl flex-1">
      <h1 className="font-semibold text-2xl">Profiles</h1>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex-1 flex justify-center items-center">
          <ScrollArea className="flex-1 whitespace-nowrap">
            <div className="flex flex-1 gap-10 selection:items-center w-full ">
              {currentHome.dwellers.map((dweller) => {
                return (
                  <Avatar
                    className="size-24 sm:size-24 xl:size-28 border-8 border-black"
                    key={dweller.user}
                  >
                    <AvatarImage src={sampleAvatar}></AvatarImage>
                  </Avatar>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="border-2 border-[#184C85] h-full rounded-3xl"></div>
      </div>
    </Card>
  );
};

export default ProfileCard;
