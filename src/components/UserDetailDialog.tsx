import { Copy, CheckCircle, XCircle, Mail, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/data/mockData";

interface UserDetailDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDetailDialog = ({ user, open, onOpenChange }: UserDetailDialogProps) => {
  const { toast } = useToast();

  if (!user) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <p className="text-sm text-muted-foreground">Viewing profile for ID #{user.id}</p>
        </DialogHeader>

        <div className="space-y-5">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full" />
              <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background ${user.status === "Active" ? "bg-success" : user.status === "Suspended" ? "bg-destructive" : "bg-muted-foreground"}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{user.name}</h3>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={user.status} />
                <span className="text-xs text-muted-foreground">{user.role}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Joined {user.joinedDate} · {user.city}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Contact Information</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email Address</p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(user.email, "Email")}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                    <p className="text-sm">{user.phone}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(user.phone, "Phone")}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rental Summary */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Rental Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Current Properties</p>
                  <p className="text-lg font-bold">{user.rentals} Units</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-lg font-bold">SAR {user.totalSpent.toLocaleString()}</p>
                </div>
              </div>
              {user.lastPaymentDate && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Last Payment:</span>
                  <StatusBadge status={user.lastPaymentStatus} />
                  <span className="text-muted-foreground">on {user.lastPaymentDate}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ID Verification */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">ID Verification Documents</h4>
                {user.idVerified ? (
                  <div className="flex items-center gap-1 text-xs text-success">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-destructive">
                    <XCircle className="h-3.5 w-3.5" />
                    Not Verified
                  </div>
                )}
              </div>
              {user.idDocuments.length > 0 ? (
                <ul className="space-y-1">
                  {user.idDocuments.map((doc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-success" />
                      {doc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No documents uploaded</p>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Edit Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
