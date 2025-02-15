"use client"
import React, { useState } from 'react';
import { 
  Receipt,
  CreditCard,
  Wallet,
  History,
  DollarSign,
  Printer,
  Search,
  Filter,
  ArrowUpDown,
  Mail,
  QrCode,
  Plus,
  BarChart
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Dummy data
const initialTransactions = [
  {
    id: "TRX-001",
    tableNumber: "T4",
    amount: 156.75,
    tip: 23.50,
    items: [
      { name: "Grilled Salmon", quantity: 2, price: 29.99 },
      { name: "House Wine", quantity: 2, price: 38.00 },
      { name: "Tiramisu", quantity: 1, price: 8.99 }
    ],
    status: "completed",
    paymentMethod: "credit_card",
    server: "John Smith",
    timestamp: "2025-02-15T19:30:00",
    customer: "Walk-in"
  },
  {
    id: "TRX-002",
    tableNumber: "T7",
    amount: 89.97,
    tip: 15.00,
    items: [
      { name: "Ribeye Steak", quantity: 1, price: 45.99 },
      { name: "Caesar Salad", quantity: 2, price: 21.98 }
    ],
    status: "pending",
    paymentMethod: "pending",
    server: "Sarah Johnson",
    timestamp: "2025-02-15T19:45:00",
    customer: "Walk-in"
  },
  {
    id: "TRX-003",
    tableNumber: "T2",
    amount: 245.50,
    tip: 36.80,
    items: [
      { name: "Chef's Special", quantity: 3, price: 135.00 },
      { name: "Cocktails", quantity: 5, price: 74.95 },
      { name: "Dessert Platter", quantity: 1, price: 35.55 }
    ],
    status: "completed",
    paymentMethod: "cash",
    server: "Mike Wilson",
    timestamp: "2025-02-15T20:15:00",
    customer: "Restaurant.com"
  }
];

const BillingAndPayments = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  
  // Calculate summary statistics
  const totalSales = transactions.reduce((sum, trx) => 
    trx.status === "completed" ? sum + trx.amount : sum, 0);
  const totalTips = transactions.reduce((sum, trx) => 
    trx.status === "completed" ? sum + trx.tip : sum, 0);
  const averageTicket = totalSales / transactions.filter(trx => 
    trx.status === "completed").length;
  const pendingPayments = transactions.filter(trx => 
    trx.status === "pending").length;

  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-500",
      pending: "bg-orange-500",
      failed: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="w-4 h-4" />;
      case "cash":
        return <Wallet className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Receipt className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Billing & Payments</h1>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" /> New Transaction
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-gray-500">+5.2% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTips.toFixed(2)}</div>
            <p className="text-xs text-gray-500">Average 15.8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageTicket.toFixed(2)}</div>
            <p className="text-xs text-gray-500">+2.3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{pendingPayments}</div>
            <p className="text-xs text-gray-500">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="transactions" className="mb-6">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="pending">Pending Bills</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Table/Source</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Server</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((trx) => (
                    <TableRow key={trx.id}>
                      <TableCell className="font-medium">{trx.id}</TableCell>
                      <TableCell>{trx.tableNumber}</TableCell>
                      <TableCell>${trx.amount.toFixed(2)}</TableCell>
                      <TableCell>${trx.tip.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(trx.paymentMethod)}
                          {trx.paymentMethod.replace('_', ' ').toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(trx.status)}>
                          {trx.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{trx.server}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Printer className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent>
              <div className="text-center p-8 text-gray-500">
                Pending bills section can be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardContent>
              <div className="text-center p-8 text-gray-500">
                Reports and analytics section can be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingAndPayments;