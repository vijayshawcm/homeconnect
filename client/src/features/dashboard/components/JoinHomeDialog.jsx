import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const JoinHomeDialog = ({ open, onOpenChange }) => {
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // track focus state for the invite code input
  const [isInviteFocused, setIsInviteFocused] = useState(false);
  const navigate = useNavigate();

  const handleJoinHome = async () => {
    if (!inviteCode.trim()) {
      setError("Please enter an invite code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully joined home!");
      onOpenChange(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error joining home:", error);
      setError(
        error.message ||
          "Failed to join home. Please check your invite code and try again."
      );
      toast.error("Failed to join home");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join a Home</DialogTitle>
          <DialogDescription>
            Enter the invite code provided by the home owner to join their home.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="invite-code" className="text-sm font-medium">
              Invite Code
            </label>
            <Input
              id="invite-code"
              placeholder="Enter invite code"
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value);
                if (error) setError("");
              }}
              onFocus={() => setIsInviteFocused(true)}
              onBlur={() => setIsInviteFocused(false)}
              className={`
								transition-colors duration-150 w-full border border-gray-300 
								focus:border-black focus-visible:ring-0 focus:outline-none
								${error && !isInviteFocused ? "border-red-500" : ""}
							`}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleJoinHome} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Home"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinHomeDialog;
