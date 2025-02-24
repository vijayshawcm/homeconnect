import { Avatar, AvatarImage } from "@/components/ui/avatar";
import sampleAvatar from "../../assets/sampleAvatar.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderAvatar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={sampleAvatar}></AvatarImage>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAvatar;
