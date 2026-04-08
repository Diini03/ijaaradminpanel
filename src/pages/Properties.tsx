import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Clock, CheckCircle, XCircle, Plus, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { mockProperties } from "@/data/mockData";

const Properties = () => {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const counts = {
    all: mockProperties.length,
    Active: mockProperties.filter((p) => p.status === "Active").length,
    "Pending Approval": mockProperties.filter((p) => p.status === "Pending Approval").length,
    Rejected: mockProperties.filter((p) => p.status === "Rejected").length,
  };

  const filtered = (tab === "all" ? mockProperties : mockProperties.filter((p) => p.status === tab))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Properties</h1>
          <p className="text-muted-foreground">Manage all property listings</p>
        </div>
        <Button asChild><Link to="/properties/new"><Plus className="h-4 w-4 mr-2" />Add Property</Link></Button>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Properties" value={counts.all} icon={Building2} />
        <StatCard title="Pending Approval" value={counts["Pending Approval"]} icon={Clock} iconBg="bg-warning/10" />
        <StatCard title="Active" value={counts.Active} icon={CheckCircle} iconBg="bg-success/10" />
        <StatCard title="Rejected" value={counts.Rejected} icon={XCircle} iconBg="bg-destructive/10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="flex items-center justify-between border-b px-4 pt-4">
              <TabsList className="bg-transparent gap-4 p-0 h-auto">
                <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="Pending Approval" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Pending ({counts["Pending Approval"]})</TabsTrigger>
                <TabsTrigger value="Active" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Active ({counts.Active})</TabsTrigger>
                <TabsTrigger value="Rejected" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Rejected ({counts.Rejected})</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 pb-3">
                <Input placeholder="Search properties..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 h-9" />
                <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5 mr-1" />Filter</Button>
                <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1" />Export</Button>
              </div>
            </div>
            <TabsContent value={tab} className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((prop) => (
                    <TableRow key={prop.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-14 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">{prop.type}</div>
                          <div>
                            <p className="text-sm font-medium">{prop.name}</p>
                            <p className="text-xs text-muted-foreground">{prop.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{prop.agency}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{prop.city}</TableCell>
                      <TableCell className="text-sm font-medium">${prop.price}/mo</TableCell>
                      <TableCell><StatusBadge status={prop.type} /></TableCell>
                      <TableCell><StatusBadge status={prop.status} /></TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                        </div>
                      </TableCell>
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

export default Properties;
