import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import StatusBadge from "@/components/StatusBadge";
import { mockRentalRequests } from "@/data/mockData";

const RentalRequests = () => {
  const [tab, setTab] = useState("all");
  const counts = {
    all: mockRentalRequests.length,
    Pending: mockRentalRequests.filter((r) => r.status === "Pending").length,
    Approved: mockRentalRequests.filter((r) => r.status === "Approved").length,
    Rejected: mockRentalRequests.filter((r) => r.status === "Rejected").length,
  };
  const filtered = tab === "all" ? mockRentalRequests : mockRentalRequests.filter((r) => r.status === tab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rental Requests</h1>
          <p className="text-muted-foreground">Manage all rental requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export Data</Button>
          <Button asChild><Link to="/rental-requests/new"><Plus className="h-4 w-4 mr-2" />New Request</Link></Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="border-b px-4 pt-4">
              <TabsList className="bg-transparent gap-4 p-0 h-auto">
                <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="Pending" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Pending ({counts.Pending})</TabsTrigger>
                <TabsTrigger value="Approved" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Approved ({counts.Approved})</TabsTrigger>
                <TabsTrigger value="Rejected" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Rejected ({counts.Rejected})</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={tab} className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"><Checkbox /></TableHead>
                    <TableHead>Request ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell><Checkbox /></TableCell>
                      <TableCell className="font-medium">{req.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src={req.userAvatar} alt={req.userName} className="h-8 w-8 rounded-full" />
                          <div>
                            <p className="text-sm font-medium">{req.userName}</p>
                            <p className="text-xs text-muted-foreground">{req.userRole}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-12 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">IMG</div>
                          <div>
                            <p className="text-sm font-medium">{req.propertyName}</p>
                            <p className="text-xs text-muted-foreground">{req.propertySpecs}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{req.agency}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{req.date}</TableCell>
                      <TableCell><StatusBadge status={req.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalRequests;
