import { Copy, CheckCircle, XCircle, Mail, Phone, MapPin, Star, Building2, Home, Users } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Agency } from "@/data/mockData";

interface AgencyDetailDialogProps {
  agency: Agency | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AgencyDetailDialog = ({ agency, open, onOpenChange }: AgencyDetailDialogProps) => {
  const { toast } = useToast();

  if (!agency) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <h2 className="text-lg font-bold">Agency Details</h2>
          <p className="text-sm text-muted-foreground">Viewing agency profile #{agency.id}</p>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <img src={agency.avatar} alt={agency.name} className="h-16 w-16 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{agency.name}</h3>
                <Badge variant="outline">{agency.type}</Badge>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <StatusBadge status={agency.status} />
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {agency.city}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                  {agency.rate}
                </div>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-0">{agency.level}</Badge>
          </div>

          {/* Description */}
          {agency.description && (
            <div>
              <h4 className="text-sm font-semibold mb-1">About</h4>
              <p className="text-sm text-muted-foreground">{agency.description}</p>
            </div>
          )}

          {/* Contact + Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-accent/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Contact Info</h4>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">{agency.email}</p>
                    <button onClick={() => copyToClipboard(agency.email, "Email")} className="text-muted-foreground hover:text-foreground">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">{agency.phone}</p>
                    <button onClick={() => copyToClipboard(agency.phone, "Phone")} className="text-muted-foreground hover:text-foreground">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">License</p>
                  <p className="text-sm font-medium">{agency.licenseNumber}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Statistics</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Properties</p>
                    <p className="text-base font-bold">{agency.totalProperties}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active</p>
                    <p className="text-base font-bold">{agency.totalActive}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Available</p>
                    <p className="text-base font-bold">{agency.totalAvailable}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active Rentals</p>
                    <p className="text-base font-bold">{agency.activeRentals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locations */}
          {agency.locations.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Service Locations</h4>
              <div className="flex flex-wrap gap-2">
                {agency.locations.map((loc) => (
                  <div key={loc} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {loc}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 px-6 pb-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Edit Agency</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgencyDetailDialog;
