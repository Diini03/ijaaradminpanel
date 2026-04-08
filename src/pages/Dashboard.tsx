import { Building2, Clock, FileText, Users, Briefcase, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dashboardStats, rentalRequestsChartData, newListingsChartData, mockRentalRequests, mockProperties } from "@/data/mockData";
import StatusBadge from "@/components/StatusBadge";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Dashboard = () => {
  const pendingRequests = mockRentalRequests.filter((r) => r.status === "Pending");
  const pendingProperties = mockProperties.filter((p) => p.status === "Pending Approval");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's your rental overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Total Properties" value={dashboardStats.totalProperties} icon={Building2} trend={{ value: 12, positive: true }} />
        <StatCard title="Pending Listings" value={dashboardStats.pendingListings} icon={Clock} trend={{ value: 5, positive: false }} iconBg="bg-warning/10" />
        <StatCard title="Pending Requests" value={dashboardStats.pendingRequests} icon={FileText} trend={{ value: 8, positive: true }} iconBg="bg-info/10" />
        <StatCard title="Active Rentals" value={dashboardStats.activeRentals} icon={Users} trend={{ value: 15, positive: true }} iconBg="bg-success/10" />
        <StatCard title="Total Agencies" value={dashboardStats.totalAgencies} icon={Briefcase} trend={{ value: 3, positive: true }} />
        <StatCard title="Payment Success" value={`${dashboardStats.paymentSuccessRate}%`} icon={TrendingUp} trend={{ value: 2.1, positive: true }} iconBg="bg-success/10" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rental Requests Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={rentalRequestsChartData}>
                <defs>
                  <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(228, 52%, 22%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(228, 52%, 22%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs" tick={{ fill: 'hsl(215, 16%, 47%)' }} />
                <YAxis className="text-xs" tick={{ fill: 'hsl(215, 16%, 47%)' }} />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="hsl(228, 52%, 22%)" fill="url(#reqGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">New Listings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={newListingsChartData}>
                <defs>
                  <linearGradient id="listGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs" tick={{ fill: 'hsl(215, 16%, 47%)' }} />
                <YAxis className="text-xs" tick={{ fill: 'hsl(215, 16%, 47%)' }} />
                <Tooltip />
                <Area type="monotone" dataKey="listings" stroke="hsl(142, 71%, 45%)" fill="url(#listGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Action Queue */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Rental Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <img src={req.userAvatar} alt={req.userName} className="h-9 w-9 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{req.userName}</p>
                    <p className="text-xs text-muted-foreground">{req.propertyName}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 text-destructive border-destructive/30 hover:bg-destructive/10">
                    <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                  </Button>
                  <Button size="sm" className="h-8">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" /> Verify
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Property Approvals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingProperties.map((prop) => (
              <div key={prop.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-14 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    {prop.type}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{prop.name}</p>
                    <p className="text-xs text-muted-foreground">{prop.city} · ${prop.price}/mo</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">View</Button>
                  <Button size="sm" className="h-8 bg-success hover:bg-success/90 text-success-foreground">Approve</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
