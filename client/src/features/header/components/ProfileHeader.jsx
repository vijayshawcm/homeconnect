import { UserRound } from "lucide-react";
import HeaderAvatar from "./HeaderAvatar";

const ProfileHeader = () => {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-3">
        <UserRound className="h-1/2 w-1/2 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        </div>
      </div>
      <HeaderAvatar />
    </div>
  );
};

export default ProfileHeader;
