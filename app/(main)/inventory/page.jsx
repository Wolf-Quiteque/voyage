"use client"
import React, { useState } from 'react';
import { 
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  AlertTriangle,
  Package,
  Truck,
  History,
  BarChart3
} from 'lucide-react';
import {
  Card,
  CardContent,
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
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

// Dummy data
const initialInventory = [
  {
    id: 1,
    name: "Ribeye Steak",
    category: "Meat",
    quantity: 45,
    unit: "kg",
    minThreshold: 20,
    price: 25.99,
    supplier: "Premium Meats Inc.",
    lastRestocked: "2025-02-10",
    status: "optimal"
  },
  {
    id: 2,
    name: "Fresh Salmon",
    category: "Seafood",
    quantity: 15,
    unit: "kg",
    minThreshold: 18,
    price: 22.50,
    supplier: "Ocean Fresh Co.",
    lastRestocked: "2025-02-12",
    status: "low"
  },
  {
    id: 3,
    name: "Basmati Rice",
    category: "Grains",
    quantity: 120,
    unit: "kg",
    minThreshold: 50,
    price: 3.99,
    supplier: "Global Foods Ltd.",
    lastRestocked: "2025-02-08",
    status: "optimal"
  },
  {
    id: 4,
    name: "Olive Oil",
    category: "Condiments",
    quantity: 8,
    unit: "L",
    minThreshold: 10,
    price: 15.99,
    supplier: "Mediterranean Imports",
    lastRestocked: "2025-02-05",
    status: "critical"
  },
  {
    id: 5,
    name: "Heavy Cream",
    category: "Dairy",
    quantity: 25,
    unit: "L",
    minThreshold: 15,
    price: 4.50,
    supplier: "Local Dairy Farm",
    lastRestocked: "2025-02-13",
    status: "optimal"
  }
];

const categories = ["All", "Meat", "Seafood", "Produce", "Dairy", "Grains", "Condiments", "Beverages"];
const statusFilters = ["All", "optimal", "low", "critical"];

const InventoryManagement = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Calculate total inventory value
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  
  // Count items by status
  const statusCounts = inventory.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedInventory = [...inventory].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    
    if (typeof aVal === 'string') {
      return sortConfig.direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const filteredInventory = sortedInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      optimal: "bg-green-500",
      low: "bg-orange-500",
      critical: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Package className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Inventory Management</h1>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" /> Add New Item
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {statusCounts.low || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {statusCounts.critical || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Items Alert */}
      {statusCounts.critical > 0 && (
        <Alert className="mb-6 border-red-500">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertTitle>Critical Stock Alert</AlertTitle>
          <AlertDescription>
            {statusCounts.critical} items are below critical threshold and need immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search items or suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map(status => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                  Item Name <ArrowUpDown className="w-4 h-4 inline-block ml-2" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                  Category <ArrowUpDown className="w-4 h-4 inline-block ml-2" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('quantity')}>
                  Quantity <ArrowUpDown className="w-4 h-4 inline-block ml-2" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('price')}>
                  Price <ArrowUpDown className="w-4 h-4 inline-block ml-2" />
                </TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <History className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Truck className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
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

export default InventoryManagement;