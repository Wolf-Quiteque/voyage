"use client"
import React, { useState } from 'react';
import { 
  Timer, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChefHat,
  Clock,
  Filter
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Dummy data
const initialOrders = [
  {
    id: 1,
    tableNumber: "T4",
    orderNumber: "ORD-001",
    items: [
      { name: "Grilled Salmon", quantity: 2, notes: "Medium well", status: "pending" },
      { name: "Caesar Salad", quantity: 1, notes: "No croutons", status: "pending" }
    ],
    priority: "high",
    timeReceived: new Date(Date.now() - 1000 * 60 * 15),
    status: "pending"
  },
  {
    id: 2,
    tableNumber: "T7",
    orderNumber: "ORD-002",
    items: [
      { name: "Ribeye Steak", quantity: 1, notes: "Rare", status: "cooking" },
      { name: "Mashed Potatoes", quantity: 1, notes: "Extra butter", status: "pending" }
    ],
    priority: "normal",
    timeReceived: new Date(Date.now() - 1000 * 60 * 10),
    status: "cooking"
  },
  // Add more dummy orders as needed
];

const KitchenDisplay = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const getTimeDifference = (timeReceived) => {
    const diff = Math.floor((Date.now() - timeReceived) / (1000 * 60));
    return `${diff}m`;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-orange-500",
      cooking: "bg-blue-500",
      completed: "bg-green-500",
      cancelled: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-500",
      normal: "bg-blue-500",
      low: "bg-green-500"
    };
    return colors[priority] || "bg-gray-500";
  };

  const updateItemStatus = (orderId, itemIndex, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const newItems = [...order.items];
        newItems[itemIndex] = { ...newItems[itemIndex], status: newStatus };
        
        // Check if all items are completed
        const allCompleted = newItems.every(item => item.status === "completed");
        return {
          ...order,
          items: newItems,
          status: allCompleted ? "completed" : "cooking"
        };
      }
      return order;
    }));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus,
            items: order.items.map(item => ({ ...item, status: newStatus }))
          }
        : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const statusMatch = filterStatus === "all" || order.status === filterStatus;
    const priorityMatch = filterPriority === "all" || order.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Kitchen Display System</h1>
        </div>
        
        <div className="flex gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cooking">Cooking</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="border-l-4 shadow-lg" style={{ borderLeftColor: order.priority === 'high' ? '#ef4444' : '#3b82f6' }}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CardTitle>Table {order.tableNumber}</CardTitle>
                  <Badge variant="outline">{order.orderNumber}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{getTimeDifference(order.timeReceived)}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge className={getPriorityColor(order.priority)}>
                  {order.priority.toUpperCase()}
                </Badge>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex-1">
                      <div className="font-medium">{item.name} × {item.quantity}</div>
                      {item.notes && (
                        <div className="text-sm text-gray-500">{item.notes}</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {item.status !== "completed" && (
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={() => updateItemStatus(order.id, index, "completed")}
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                {order.status !== "completed" && (
                  <Button 
                    variant="outline"
                    className="text-green-500 hover:text-green-700"
                    onClick={() => updateOrderStatus(order.id, "completed")}
                  >
                    Complete All
                  </Button>
                )}
                {order.status !== "cancelled" && (
                  <Button 
                    variant="outline"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => updateOrderStatus(order.id, "cancelled")}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KitchenDisplay;