"use client"
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download,
  CreditCard,
  Wallet,
  DollarSign,
  TrendingUp,
  Filter
} from 'lucide-react';

const PaymentsPage = () => {
  // Dummy payment data
  const initialPayments = [
    {
      id: "PAY-001",
      date: "2024-02-15",
      customer: "John Smith",
      amount: 125.50,
      method: "Credit Card",
      status: "completed",
      orderType: "Dine-in",
      items: ["Grilled Salmon", "Caesar Salad", "Wine"]
    },
    {
      id: "PAY-002",
      date: "2024-02-15",
      customer: "Sarah Johnson",
      amount: 85.75,
      method: "Cash",
      status: "completed",
      orderType: "Takeaway",
      items: ["Pasta Carbonara", "Tiramisu"]
    },
    // Add more dummy data here
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-500",
      pending: "bg-orange-500",
      failed: "bg-red-500",
      refunded: "bg-gray-500"
    };
    return styles[status] || "bg-gray-500";
  };

  const todayTotal = payments
    .filter(payment => payment.date === "2024-02-15")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments & Billing</h1>
          <p className="text-gray-500">Manage payments and transactions</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${todayTotal.toFixed(2)}</div>
            <p className="text-xs text-gray-500">+5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Card Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {payments.filter(p => p.method === "Credit Card").length}
            </div>
            <p className="text-xs text-gray-500">Today's transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Payments</CardTitle>
            <Wallet className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {payments.filter(p => p.method === "Cash").length}
            </div>
            <p className="text-xs text-gray-500">Today's transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${(payments.reduce((sum, p) => sum + p.amount, 0) / payments.length).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>View and manage payment transactions</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="digital">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments
                .filter(payment =>
                  payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  payment.id.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {payment.method === "Credit Card" ? (
                          <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                        ) : (
                          <Wallet className="h-4 w-4 mr-2 text-orange-500" />
                        )}
                        {payment.method}
                      </div>
                    </TableCell>
                    <TableCell>{payment.orderType}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadge(payment.status)} text-white`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">
                        {payment.items.join(", ")}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
};

export default PaymentsPage;