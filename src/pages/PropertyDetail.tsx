import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, DollarSign, Home, Maximize, Wifi, Wind, Waves, Dumbbell, Car, Tv, UtensilsCrossed, WashingMachine, CheckCircle, XCircle, CigaretteOff, Dog, VolumeX, Ban, ClipboardList, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { mockProperties, mockAgencies, mockOwners, mockHouseRules } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi, AC: Wind, Pool: Waves, Gym: Dumbbell, Parking: Car, TV: Tv, Kitchen: UtensilsCrossed, Laundry: WashingMachine,
};

const ruleIcons: Record<string, React.ElementType> = {
  "cigarette-off": CigaretteOff, dog: Dog, "volume-x": VolumeX, ban: Ban, clipboard: ClipboardList,
};

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mainImage, setMainImage] = useState(0);

  const property = mockProperties.find((p) => p.id === id);
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-lg text-muted-foreground">Property not found</p>
        <Button onClick={() => navigate("/properties")}>Back to Properties</Button>
      </div>
    );
  }

  const agency = mockAgencies.find((a) => a.id === property.agencyId);
  const owner = mockOwners.find((o) => o.id === property.ownerId);
  const houseRules = mockHouseRules.find((hr) => hr.id === property.houseRulesId);
  const durationLabel = property.rentalDuration === "monthly" ? "/mo" : property.rentalDuration === "3monthly" ? "/3mo" : "/yr";

  const handleApprove = () => {
    toast({ title: "Property approved successfully" });
    navigate("/properties");
  };

  const handleReject = () => {
    toast({ title: "Property rejected", variant: "destructive" });
    navigate("/properties");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{property.name}</h1>
              <StatusBadge status={property.status} />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <span className="text-sm">ID: #{property.id}</span>
              <span>·</span>
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm">{property.location}, {property.city}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-sm font-medium">{property.rate}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-3 h-72">
        <div className="col-span-3 rounded-lg overflow-hidden bg-muted">
          <img
            src={property.images[mainImage]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          {property.images.slice(0, 3).map((img, i) => (
            <button
              key={i}
              onClick={() => setMainImage(i)}
              className={`rounded-lg overflow-hidden bg-muted flex-1 border-2 transition-colors ${mainImage === i ? "border-primary" : "border-transparent"}`}
            >
              <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Price</p>
              <p className="text-lg font-bold">${property.price.toLocaleString()}{durationLabel}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Type</p>
              <p className="text-lg font-bold">{property.type}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Maximize className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Size</p>
              <p className="text-lg font-bold">{property.sqft.toLocaleString()} sq ft</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* About */}
          <Card>
            <CardHeader><CardTitle className="text-lg">About this property</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>
              <div className="flex gap-4 mt-4 text-sm">
                <span className="flex items-center gap-1.5"><strong>{property.bedrooms}</strong> Bedrooms</span>
                <span className="flex items-center gap-1.5"><strong>{property.bathrooms}</strong> Bathrooms</span>
                <span className="flex items-center gap-1.5"><strong>{property.sqft}</strong> sq ft</span>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Amenities</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Wifi;
                  return (
                    <div key={amenity} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-sm">
                      <Icon className="h-4 w-4 text-primary" />
                      {amenity}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* House Rules */}
          {houseRules && (
            <Card>
              <CardHeader><CardTitle className="text-lg">House Rules</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {houseRules.rules.map((rule, i) => {
                    const Icon = ruleIcons[rule.icon] || Ban;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${rule.active ? "bg-success/10" : "bg-muted"}`}>
                          <Icon className={`h-4 w-4 ${rule.active ? "text-success" : "text-muted-foreground"}`} />
                        </div>
                        <span className={`text-sm ${!rule.active ? "line-through text-muted-foreground" : ""}`}>{rule.text}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Listed By */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Listed by</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {owner && (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {owner.fullName.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{owner.fullName}</p>
                    {agency && <p className="text-xs text-muted-foreground">{agency.name}</p>}
                  </div>
                </div>
              )}
              {agency && (
                <>
                  <div className="flex items-center gap-2">
                    {agency.status === "Verified" && (
                      <div className="flex items-center gap-1.5 text-xs text-success">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Verified Agency
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/agencies`)}>
                    View Agency Profile
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Rental Duration */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Rental Details</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium capitalize">{property.rentalDuration === "3monthly" ? "3 Months" : property.rentalDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Listed</span>
                <span className="font-medium">{property.listedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">City</span>
                <span className="font-medium">{property.city}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons (for pending properties) */}
          {property.status === "Pending Approval" && (
            <div className="flex gap-3">
              <Button variant="destructive" className="flex-1" onClick={handleReject}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button className="flex-1" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
