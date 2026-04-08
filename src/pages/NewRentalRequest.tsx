import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewRentalRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Request created successfully" });
    navigate("/rental-requests");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <h1 className="text-2xl font-bold">New Rental Request</h1>
          <p className="text-muted-foreground">Create a new rental request</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Request Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tenant</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select tenant" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="U002">Fadumo Hassan</SelectItem>
                    <SelectItem value="U004">Halima Abdirahman</SelectItem>
                    <SelectItem value="U006">Nasra Ibrahim</SelectItem>
                    <SelectItem value="U008">Sahra Warsame</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Property</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P001">Sunset Villa - Mogadishu</SelectItem>
                    <SelectItem value="P002">Hargeisa Heights Apt</SelectItem>
                    <SelectItem value="P004">Kismayo Family House</SelectItem>
                    <SelectItem value="P007">Galkayo Modern Apt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Agency</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select agency" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A001">Mogadishu Realty</SelectItem>
                    <SelectItem value="A002">Somali Homes</SelectItem>
                    <SelectItem value="A003">South Properties</SelectItem>
                    <SelectItem value="A005">Central Realty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Move-in Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes or requirements..." rows={4} />
            </div>
            <div className="flex gap-3">
              <Button type="submit">Create Request</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewRentalRequest;
