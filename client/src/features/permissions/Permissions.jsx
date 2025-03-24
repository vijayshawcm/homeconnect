import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import sampleAvatar from "../../assets/sampleAvatar.png";
import { Separator } from "@/components/ui/separator";
import { useHomeStore } from "@/store/home";
import { userAuthStore } from "@/store/userAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import addDweller from "../../assets/addDweller.svg";

const Permissions = () => {
  const { currentHome, updateHome } = useHomeStore();
  const { user } = userAuthStore();
  const permsSettings = [
    {
      value: "addRemoveDweller",
      description: "Add and remove dwellers",
    },
    {
      value: "modifyDweller",
      description: "Modify other dweller permissions",
    },
    {
      value:"addRemoveAppliance",
      description: "Add and remove appliances",
    },
    {
      value: "onOffAppliance",
      description: "Turn appliances on and off",
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
      description: "Enable and disable appliances",
    },
    {
      value: "modifyHome",
      description: "Modify the home",
    },
  ];

  // Function to handle permission toggle
  const handlePermissionToggle = async (dweller, permission) => {
    const updatedPermissions = {
      ...dweller.accessLevel,
      [permission]: !dweller.accessLevel[permission],
    };

    try {
      const response = await fetch("server/perms/dweller", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requester: user.username,
          username: dweller.user.userInfo.username,
          permissions: Object.keys(updatedPermissions).filter(
            (key) => updatedPermissions[key]
          ),
          home: currentHome._id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        updateHome(); // Refresh home data to reflect changes
      } else {
        console.error("Failed to update permissions:", await response.text());
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  return (
    <div className="flex-1 flex gap-4 p-4">
      <Card className="p-10 flex flex-col gap-8 rounded-3xl w-[35%]">
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
        <div className="flex justify-center items-center"></div>
      </Card>
      <div className="flex-1 flex flex-col gap-2 p-4">
        <ScrollArea className="max-h-[80%]">
          <div className="flex flex-col gap-4 p-4">
            {currentHome.dwellers.map((dweller) => {
              return (
                <Dialog key={dweller._id}>
                  <DialogTrigger asChild>
                    <Card
                      key={dweller._id}
                      className="p-6 flex gap-10 cursor-pointer hover:scale-105 transition-all duration-300"
                    >
                      <Avatar className="aspect-square w-[15%] h-auto border-2 border-black">
                        <AvatarImage src={sampleAvatar} />
                      </Avatar>
                      <div className="flex flex-col justify-center gap-2">
                        <div className="font-semibold">
                          {dweller.user.userInfo.displayName}
                        </div>
                        <div>{dweller.user.userInfo.email}</div>
                      </div>
                    </Card>
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
                            <Switch
                              checked={dweller.accessLevel[value] || false}
                              onCheckedChange={() =>
                                handlePermissionToggle(dweller, value)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </ScrollArea>
        <Card className="flex justify-center items-center p-4 cursor-pointer" onClick = {() => {
          
        }}>
          <Avatar className="size-24 sm:size-24 xl:size-28" key={user.fullName}>
            <AvatarImage src={addDweller}></AvatarImage>
          </Avatar>
        </Card>
      </div>
    </div>
  );
};

export default Permissions;
