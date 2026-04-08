import { useState } from "react";
import { Link } from "react-router-dom";
import { Users as UsersIcon, Home, Plus, Eye, Edit, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { mockUsers } from "@/data/mockData";
import type { User } from "@/data/mockData";
import UserDetailDialog from "@/components/UserDetailDialog";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = mockUsers
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    .filter((u) => statusFilter === "all" || u.status === statusFilter);

  const totalRentals = mockUsers.reduce((sum, u) => sum + u.rentals, 0);

  const openUserDetail = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage platform users</p>
        </div>
        <Button asChild><Link to="/users/new"><Plus className="h-4 w-4 mr-2" />Add User</Link></Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <StatCard title="Total Users" value={mockUsers.length} icon={UsersIcon} trend={{ value: 10, positive: true }} />
        <StatCard title="Active Rentals" value={totalRentals} icon={Home} iconBg="bg-success/10" trend={{ value: 5, positive: true }} />
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Rentals</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <Badge variant="outline" className="text-[10px] mt-0.5">{user.role}</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.phone}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.joinedDate}</TableCell>
                  <TableCell className="text-sm">{user.rentals}</TableCell>
                  <TableCell><StatusBadge status={user.status} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openUserDetail(user)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Ban className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UserDetailDialog user={selectedUser} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default UsersPage;
