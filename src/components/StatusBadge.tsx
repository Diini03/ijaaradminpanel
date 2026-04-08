import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "Active" | "Pending" | "Pending Approval" | "Approved" | "Rejected" | "Verified" | "Suspended" | "Inactive" | "Paid" | "Failed";

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  Approved: "bg-success/10 text-success border-success/20",
  Verified: "bg-success/10 text-success border-success/20",
  Paid: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  "Pending Approval": "bg-warning/10 text-warning border-warning/20",
  Rejected: "bg-destructive/10 text-destructive border-destructive/20",
  Failed: "bg-destructive/10 text-destructive border-destructive/20",
  Suspended: "bg-destructive/10 text-destructive border-destructive/20",
  Inactive: "bg-muted text-muted-foreground border-muted",
};

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => (
  <Badge variant="outline" className={cn("font-medium text-xs", statusStyles[status] || "", className)}>
    {status}
  </Badge>
);

export default StatusBadge;
