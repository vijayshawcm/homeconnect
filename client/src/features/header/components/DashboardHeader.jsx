import HeaderAvatar from "./HeaderAvatar";
import { HeaderInput } from "./HeaderInput";

const DashboardHeader = () => {
  return (
    <div className="flex flex-1 items-center justify-between">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex">
        <HeaderInput />
        <HeaderAvatar />
      </div>
    </div>
  );
};

export default DashboardHeader;
