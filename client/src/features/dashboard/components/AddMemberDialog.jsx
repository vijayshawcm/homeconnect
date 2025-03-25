import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useHomeStore } from "@/store/home";
import { userAuthStore } from "@/store/userAuth";

const AddMemberDialog = ({ homeId, invitationCode, onClose }) => {
  const [inviteCode, setInviteCode] = useState("");
  const { user } = userAuthStore();
  const { currentHome, createInvite } = useHomeStore();
  const handleInvite = async () => {
    const data = await createInvite({
      home: currentHome._id,
      username: user.username,
    });
    setInviteCode(data);
  };
  useEffect(() => {
    handleInvite();
  }, [user]);
  return (
    <DialogContent className="w-[90%] rounded-lg">
      <DialogHeader>
        <DialogTitle>Invite to Home</DialogTitle>
      </DialogHeader>
      <form className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label>Invitation Code</Label>
          <div className="p-2 rounded-md bg-muted/100">
            <code className="text-sm font-mono">
              {inviteCode ? inviteCode : ""}
            </code>
          </div>
          <p className="text-xs text-muted-foreground">
            New users can sign up using this code to join directly
          </p>
        </div>
      </form>
    </DialogContent>
  );
};

export default AddMemberDialog;
