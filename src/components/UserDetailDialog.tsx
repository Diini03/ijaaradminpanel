import { Copy, CheckCircle, XCircle, Mail, Phone, Calendar, MapPin, Edit, RotateCcw, Home } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
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
      <DialogContent className="max-w-2xl p-0">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <h2 className="text-lg font-bold">User Details</h2>
          <p className="text-sm text-muted-foreground">Viewing profile for ID #{user.id}</p>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full" />
              <div className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-background ${user.status === "Active" ? "bg-success" : user.status === "Suspended" ? "bg-destructive" : "bg-muted-foreground"}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Joined {user.joinedDate}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {user.city}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge status={`${user.status} ${user.role}`} />
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1.5" />Edit
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Contact + Rental Summary side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Contact Information */}
            <Card className="bg-accent/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Contact Information</h4>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">{user.email}</p>
                    <button onClick={() => copyToClipboard(user.email, "Email")} className="text-muted-foreground hover:text-foreground">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">{user.phone}</p>
                    <button onClick={() => copyToClipboard(user.phone, "Phone")} className="text-muted-foreground hover:text-foreground">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rental Summary */}
            <Card className="bg-accent/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Rental Summary</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Properties</p>
                    <p className="text-base font-bold">{user.rentals} Units</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                    <p className="text-base font-bold">SAR {user.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
                {user.lastPaymentDate && (
                  <div>
                    <p className="text-xs text-muted-foreground">Last Payment</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className={`h-2 w-2 rounded-full ${user.lastPaymentStatus === "Paid" ? "bg-success" : user.lastPaymentStatus === "Pending" ? "bg-warning" : "bg-destructive"}`} />
                      <span className="text-sm">{user.lastPaymentStatus} on {user.lastPaymentDate}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ID Verification */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">ID Verification Documents</h3>
              {user.idVerified ? (
                <span className="flex items-center gap-1 text-sm text-success font-medium">
                  <CheckCircle className="h-4 w-4" />
                  Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm text-destructive font-medium">
                  <XCircle className="h-4 w-4" />
                  Not Verified
                </span>
              )}
            </div>
            {user.idDocuments.length > 0 ? (
              <Card>
                <CardContent className="p-4">
                  <div className="h-40 rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <p className="text-sm font-medium">{user.idDocuments[0]}</p>
                      <p className="text-xs mt-1">Document preview</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground text-center py-6">No documents uploaded</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-3 px-6 pb-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
