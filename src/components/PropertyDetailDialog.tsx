import { useState } from "react";
import { Wifi, Wind, Waves, Dumbbell, Car, Tv, UtensilsCrossed, WashingMachine, CheckCircle, CigaretteOff, Dog, VolumeX, Ban, ClipboardList, MapPin, Home, Maximize, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { mockAgencies, mockOwners, mockHouseRules } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import type { Property } from "@/data/mockData";

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi, AC: Wind, Pool: Waves, Gym: Dumbbell, Parking: Car, TV: Tv, Kitchen: UtensilsCrossed, Laundry: WashingMachine,
};

const ruleIcons: Record<string, React.ElementType> = {
  "cigarette-off": CigaretteOff, dog: Dog, "volume-x": VolumeX, ban: Ban, clipboard: ClipboardList,
};

interface PropertyDetailDialogProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PropertyDetailDialog = ({ property, open, onOpenChange }: PropertyDetailDialogProps) => {
  const { toast } = useToast();
  const [mainImage, setMainImage] = useState(0);

  if (!property) return null;

  const agency = mockAgencies.find((a) => a.id === property.agencyId);
  const owner = mockOwners.find((o) => o.id === property.ownerId);
  const houseRules = mockHouseRules.find((hr) => hr.id === property.houseRulesId);
  const durationLabel = property.rentalDuration === "monthly" ? "/mo" : property.rentalDuration === "3monthly" ? "/3mo" : "/yr";

  const handleApprove = () => {
    toast({ title: "Property approved successfully" });
    onOpenChange(false);
  };

  const handleReject = () => {
    toast({ title: "Property rejected", variant: "destructive" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{property.name}</h2>
            <StatusBadge status={property.status} />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <span className="text-sm">ID: #{property.id}</span>
            <span>·</span>
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm">{property.location}, {property.city}</span>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Image Gallery — large left + 2 stacked right */}
          <div className="grid grid-cols-4 gap-2" style={{ height: "280px" }}>
            <button
              className="col-span-3 rounded-xl overflow-hidden bg-muted"
              onClick={() => setMainImage(0)}
            >
              <img src={property.images[mainImage]} alt={property.name} className="w-full h-full object-cover" />
            </button>
            <div className="flex flex-col gap-2">
              {property.images.slice(1, 3).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i + 1)}
                  className={`rounded-xl overflow-hidden bg-muted flex-1 border-2 transition-colors ${mainImage === i + 1 ? "border-primary" : "border-transparent"}`}
                >
                  <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Cards — clean style matching mockup */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border rounded-xl p-4">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Price</p>
              <p className="text-xl font-bold">${property.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground"> {durationLabel}</span></p>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Type</p>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-muted-foreground" />
                <p className="text-xl font-bold">{property.type}</p>
              </div>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Size</p>
              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-muted-foreground" />
                <p className="text-xl font-bold">{property.sqft.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">sq ft</span></p>
              </div>
            </div>
          </div>

          {/* Content: About + Listed By / House Rules */}
          <div className="grid grid-cols-5 gap-5">
            {/* Left: About + Amenities */}
            <div className="col-span-3 space-y-5">
              <div>
                <h3 className="font-semibold mb-2">About this property</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Wifi;
                    return (
                      <div key={amenity} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        {amenity === "AC" ? "Air Conditioning" : amenity === "WiFi" ? "Free WiFi" : amenity}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Listed By + House Rules */}
            <div className="col-span-2 space-y-5">
              {/* Listed By */}
              <div className="border rounded-xl p-4 space-y-3">
                <p className="text-[11px] text-primary uppercase tracking-wider font-semibold">Listed By</p>
                {owner && (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {owner.fullName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{owner.fullName}</p>
                      {agency && <p className="text-xs text-muted-foreground">{agency.name}</p>}
                    </div>
                  </div>
                )}
                {agency?.status === "Verified" && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Verified Agency
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View Agency Profile
                </Button>
              </div>

              {/* House Rules */}
              {houseRules && (
                <div>
                  <h3 className="font-semibold mb-2">House Rules</h3>
                  <div className="space-y-2">
                    {houseRules.rules.filter(r => r.active).map((rule, i) => {
                      const Icon = ruleIcons[rule.icon] || Ban;
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{rule.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {property.status === "Pending Approval" && (
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleReject}>
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Property
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailDialog;
