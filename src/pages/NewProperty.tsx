import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockOwners, mockAgencies } from "@/data/mockData";

const AMENITIES = ["WiFi", "AC", "Pool", "Gym", "Parking", "TV", "Kitchen", "Laundry"];

const NewProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [houseRules, setHouseRules] = useState([{ text: "", active: true }]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const addRule = () => setHouseRules((prev) => [...prev, { text: "", active: true }]);
  const removeRule = (index: number) => setHouseRules((prev) => prev.filter((_, i) => i !== index));
  const updateRule = (index: number, field: "text" | "active", value: string | boolean) => {
    setHouseRules((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Property added successfully" });
    navigate("/properties");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <h1 className="text-2xl font-bold">Add Property</h1>
          <p className="text-muted-foreground">Add a new property listing</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Property Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Property Name</Label>
                <Input placeholder="e.g. Sunset Villa" required />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Room">Room</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mogadishu">Mogadishu</SelectItem>
                    <SelectItem value="Hargeisa">Hargeisa</SelectItem>
                    <SelectItem value="Kismayo">Kismayo</SelectItem>
                    <SelectItem value="Bosaso">Bosaso</SelectItem>
                    <SelectItem value="Galkayo">Galkayo</SelectItem>
                    <SelectItem value="Berbera">Berbera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Street Address</Label>
                <Input placeholder="e.g. Lido Beach Road" />
              </div>
              <div className="space-y-2">
                <Label>Monthly Price ($)</Label>
                <Input type="number" placeholder="e.g. 800" min="0" required />
              </div>
              <div className="space-y-2">
                <Label>Size (sq ft)</Label>
                <Input type="number" placeholder="e.g. 1250" min="0" />
              </div>
              <div className="space-y-2">
                <Label>Rental Duration</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="3monthly">3 Months</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <Input type="number" placeholder="e.g. 4.5" min="0" max="5" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label>Owner</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select owner" /></SelectTrigger>
                  <SelectContent>
                    {mockOwners.map((o) => (
                      <SelectItem key={o.id} value={o.id}>{o.fullName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Agency</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select agency" /></SelectTrigger>
                  <SelectContent>
                    {mockAgencies.map((a) => (
                      <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input type="number" placeholder="0" min="0" />
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input type="number" placeholder="0" min="0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe the property in detail..." rows={4} />
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-4 gap-3">
                {AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>House Rules</Label>
                <Button type="button" variant="outline" size="sm" onClick={addRule}>
                  <Plus className="h-3.5 w-3.5 mr-1" />Add Rule
                </Button>
              </div>
              <div className="space-y-2">
                {houseRules.map((rule, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Input
                      placeholder="e.g. No smoking allowed"
                      value={rule.text}
                      onChange={(e) => updateRule(i, "text", e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.active}
                        onCheckedChange={(v) => updateRule(i, "active", v)}
                      />
                      <span className="text-xs text-muted-foreground w-10">{rule.active ? "Active" : "Off"}</span>
                    </div>
                    {houseRules.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeRule(i)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label>Images</Label>
              <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
                <p className="text-sm text-muted-foreground">Drag and drop images here, or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">You can upload multiple images (slides)</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">Choose Files</Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit">Add Property</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewProperty;
