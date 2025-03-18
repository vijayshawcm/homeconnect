import { Card } from "@/components/ui/card";

const ExpandedView = ({ appliance }) => {
  return <Card className="flex-1">{appliance === "light" ? null : null}</Card>;
};

export default ExpandedView;
