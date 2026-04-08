import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Clock, Users, Plus, Filter, Eye, CheckCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { mockAgencies } from "@/data/mockData";

const Agencies = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockAgencies
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    .filter((a) => statusFilter === "all" || a.status === statusFilter);

  const pendingCount = mockAgencies.filter((a) => a.status === "Pending").length;
  const totalRentals = mockAgencies.reduce((sum, a) => sum + a.activeRentals, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agencies</h1>
          <p className="text-muted-foreground">Manage registered agencies</p>
        </div>
        <Button asChild><Link to="/agencies/new"><Plus className="h-4 w-4 mr-2" />Add Agency</Link></Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <StatCard title="Total Agencies" value={mockAgencies.length} icon={Briefcase} trend={{ value: 8, positive: true }} />
        <StatCard title="Pending Verification" value={pendingCount} icon={Clock} iconBg="bg-warning/10" />
        <StatCard title="Active Rentals" value={totalRentals} icon={Users} iconBg="bg-success/10" />
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Input placeholder="Search agencies..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Listings</TableHead>
                <TableHead>Active Rentals</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((agency) => (
                <TableRow key={agency.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={agency.avatar} alt={agency.name} className="h-9 w-9 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{agency.name}</p>
                        <p className="text-xs text-muted-foreground">{agency.id} · {agency.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{agency.type}</Badge>
                  </TableCell>
                  <TableCell><StatusBadge status={agency.status} /></TableCell>
                  <TableCell className="text-sm">{agency.listings}</TableCell>
                  <TableCell className="text-sm">{agency.activeRentals}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      {agency.status === "Pending" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success"><CheckCircle className="h-4 w-4" /></Button>
                      )}
                      {agency.status !== "Suspended" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Ban className="h-4 w-4" /></Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agencies;
