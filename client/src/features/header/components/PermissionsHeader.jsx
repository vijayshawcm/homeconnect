import { Users } from "lucide-react";
import HeaderAvatar from "./HeaderAvatar";

const PermissionsHeader = () => {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-3">
        <Users className="h-1/2 w-1/2 text-primary" />
        <div className="">
          <h1 className="text-2xl font-semibold whitespace-nowrap">User Management</h1>
        </div>
      </div>
      <HeaderAvatar />
    </div>
  );
};

export default PermissionsHeader;
