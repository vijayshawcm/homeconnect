import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import sampleAvatar from "../../assets/sampleAvatar.png";

const ProfileCard = () => {
  return (
    <Card className="bg-white p-6 flex flex-col justify-end gap-8 rounded-3xl">
      <h1 className="font-bold text-xl">Profiles</h1>
      <div className="flex gap-5 flex-1 justify-between items-center">
        <Avatar className="size-28">
          <AvatarImage src={sampleAvatar}></AvatarImage>
        </Avatar>
        <Avatar className="size-28">
          <AvatarImage src={sampleAvatar}></AvatarImage>
        </Avatar>
        <Avatar className="size-28">
          <AvatarImage src={sampleAvatar}></AvatarImage>
        </Avatar>
        <Avatar className="size-28">
          <AvatarImage src={sampleAvatar}></AvatarImage>
        </Avatar>
      </div>
    </Card>
  );
};

export default ProfileCard;
