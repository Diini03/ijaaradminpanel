import { useState } from "react";
import { CreditCard, Clock, XCircle, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { mockPayments } from "@/data/mockData";

const methodColors: Record<string, string> = {
  "EVC Plus": "bg-info/10 text-info border-info/20",
  Edahab: "bg-success/10 text-success border-success/20",
  Golis: "bg-warning/10 text-warning border-warning/20",
  "Bank Transfer": "bg-primary/10 text-primary border-primary/20",
};

const Payments = () => {
  const [tab, setTab] = useState("all");

  const totalRevenue = mockPayments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = mockPayments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
  const failedCount = mockPayments.filter((p) => p.status === "Failed").length;

  const counts = {
    all: mockPayments.length,
    Paid: mockPayments.filter((p) => p.status === "Paid").length,
    Pending: mockPayments.filter((p) => p.status === "Pending").length,
    Failed: mockPayments.filter((p) => p.status === "Failed").length,
  };

  const filtered = tab === "all" ? mockPayments : mockPayments.filter((p) => p.status === tab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Track all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={CreditCard} trend={{ value: 12, positive: true }} iconBg="bg-success/10" />
        <StatCard title="Pending Amount" value={`$${pendingAmount.toLocaleString()}`} icon={Clock} iconBg="bg-warning/10" />
        <StatCard title="Failed Transactions" value={failedCount} icon={XCircle} iconBg="bg-destructive/10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="border-b px-4 pt-4">
              <TabsList className="bg-transparent gap-4 p-0 h-auto">
                <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="Paid" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Paid ({counts.Paid})</TabsTrigger>
                <TabsTrigger value="Pending" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Pending ({counts.Pending})</TabsTrigger>
                <TabsTrigger value="Failed" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none bg-transparent">Failed ({counts.Failed})</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={tab} className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((pay) => (
                    <TableRow key={pay.id}>
                      <TableCell className="font-medium">{pay.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src={pay.userAvatar} alt={pay.userName} className="h-8 w-8 rounded-full" />
                          <div>
                            <p className="text-sm font-medium">{pay.userName}</p>
                            <p className="text-xs text-muted-foreground">{pay.userRole}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{pay.propertyName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={methodColors[pay.method] || ""}>{pay.method}</Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">${pay.amount}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{pay.date}</TableCell>
                      <TableCell><StatusBadge status={pay.status} /></TableCell>
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

export default Payments;
