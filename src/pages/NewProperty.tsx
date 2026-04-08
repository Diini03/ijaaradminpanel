import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label>Agency</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select agency" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A001">Mogadishu Realty</SelectItem>
                    <SelectItem value="A002">Somali Homes</SelectItem>
                    <SelectItem value="A003">South Properties</SelectItem>
                    <SelectItem value="A004">Puntland Estates</SelectItem>
                    <SelectItem value="A005">Central Realty</SelectItem>
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
              <Textarea placeholder="Describe the property..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Images</Label>
              <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
                <p className="text-sm text-muted-foreground">Drag and drop images here, or click to upload</p>
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
