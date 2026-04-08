import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewAgency = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Agency added successfully" });
    navigate("/agencies");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <h1 className="text-2xl font-bold">Add Agency</h1>
          <p className="text-muted-foreground">Register a new agency</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Agency Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Agency Name</Label>
                <Input placeholder="e.g. Mogadishu Realty" required />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Company">Company</SelectItem>
                    <SelectItem value="Individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input type="email" placeholder="agency@email.com" required />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="+252 61 000 0000" required />
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
                <Label>Address</Label>
                <Input placeholder="Street address" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>License Number</Label>
                <Input placeholder="e.g. MR-2024-001" required />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit">Add Agency</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewAgency;
