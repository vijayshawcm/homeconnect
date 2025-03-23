import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import sampleAvatar from "../../assets/sampleAvatar.png";
import { Separator } from "@/components/ui/separator";
import { useHomeStore } from "@/store/home";
import { userAuthStore } from "@/store/userAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const Permissions = () => {
  const { currentHome } = useHomeStore();
  const { user } = userAuthStore();
  const permsSettings = [
    {
      value: "addRemoveDweller",
      description: "Add and Remove dwellers",
    },
    {
      value: "modifyDweller",
      description: "Modify other dweller permissions",
    },
    {
      value: "onOffAppliance",
      description: "Turn on/off appliances",
    },
    {
      value: "adjustAppliance",
      description: "Adjust appliance settings",
    },
    {
      value: "automateAppliance",
      description: "Automate appliances",
    },
    {
      value: "enableDisableAppliance",
      description: "Enable/Disable appliances",
    },
    {
      value: "modifyHome",
      description: "Modify the home",
    },
  ];
  return (
    <div className="flex-1 grid grid-cols-2 gap-4 p-4">
      <Card className="p-10 flex flex-col gap-8 rounded-3xl">
        <div className="w-full flex justify-center">
          <Avatar className="aspect-square w-[25%] h-auto border-2 border-black">
            <AvatarImage src={sampleAvatar} />
          </Avatar>
        </div>
        <div className="flex flex-col gap-5 mb-4">
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-xl">Name</div>
            <div className="font-light text-xl">{user.fullName}</div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-xl">Email</div>
            <div className="font-light text-xl"> {user.email}</div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-xl">User Type</div>
            <div className="font-light text-xl text-[#184C85]">
              {user.username === currentHome.owner.userInfo.username
                ? "Home Owner"
                : "Home Dweller"}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#C2E03A] text-black hover:bg-[#A8C82A]">
                Edit Permission
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md !rounded-2xl border-2 border-[#184C85]">
              <DialogHeader className="p-2">
                <DialogTitle className="text-center font-semibold tracking-wide text-xl">
                  Permissions
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 p-2">
                {permsSettings.map(({ value, description }) => {
                  return (
                    <div
                      key={value}
                      className="flex justify-between items-center"
                    >
                      {description}
                      <Switch />
                    </div>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
      <Card></Card>
    </div>
  );
};

export default Permissions;
