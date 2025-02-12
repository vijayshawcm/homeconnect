import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import sampleAvatar from "../../assets/sampleAvatar.png";

const HeaderAvatar = () => {
  return (
    <Avatar className="aspect-square w-14">
      <AvatarImage src={sampleAvatar}></AvatarImage>
    </Avatar>
  );
};

export default HeaderAvatar;
