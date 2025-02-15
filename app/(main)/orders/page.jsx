'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  UtensilsCrossed,
  Plus,
  Timer,
  Users,
  Ban,
  Check,
  Coffee,
  ChefHat,
  Clock,
  DollarSign,
} from 'lucide-react';

// Dummy data for tables
const initialTables = [
  { id: 1, number: 1, capacity: 4, status: 'available', orders: [] },
  { id: 2, number: 2, capacity: 2, status: 'occupied', orders: [
    { id: 1, items: ['Margherita Pizza', 'Caesar Salad'], status: 'preparing', time: '15:30' }
  ]},
  { id: 3, number: 3, capacity: 6, status: 'reserved', orders: [] },
  { id: 4, number: 4, capacity: 4, status: 'occupied', orders: [
    { id: 2, items: ['Beef Burger', 'French Fries', 'Coke'], status: 'served', time: '15:15' }
  ]},
  { id: 5, number: 5, capacity: 2, status: 'cleaning', orders: [] },
  { id: 6, number: 6, capacity: 8, status: 'available', orders: [] },
];

const menuItems = [
  { id: 1, name: 'Margherita Pizza', category: 'Main', price: 14.99 },
  { id: 2, name: 'Beef Burger', category: 'Main', price: 12.99 },
  { id: 3, name: 'Caesar Salad', category: 'Starter', price: 8.99 },
  { id: 4, name: 'French Fries', category: 'Side', price: 4.99 },
  { id: 5, name: 'Coke', category: 'Beverage', price: 2.99 },
];

export default function TablesAndOrders() {
  const [tables, setTables] = useState(initialTables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      occupied: 'bg-blue-100 text-blue-800',
      reserved: 'bg-orange-100 text-orange-800',
      cleaning: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getOrderStatusColor = (status) => {
    const colors = {
      preparing: 'text-orange-500',
      served: 'text-green-500',
      completed: 'text-blue-500'
    };
    return colors[status] || 'text-gray-500';
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  const TableGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tables.map((table) => (
        <Card 
          key={table.id}
          className={`cursor-pointer hover:shadow-lg transition-shadow ${
            selectedTable?.id === table.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => handleTableClick(table)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Table {table.number}</CardTitle>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(table.status)}`}>
                {table.status}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Capacity: {table.capacity}</span>
            </div>
            {table.orders.length > 0 && (
              <div className="mt-2 space-y-2">
                {table.orders.map((order) => (
                  <div key={order.id} className="text-sm border-t pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{order.time}</span>
                      <span className={`ml-auto ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-1 text-gray-600">
                      {order.items.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ActionBar = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Plus className="mr-2 h-4 w-4" /> New Order
      </Button>
      <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
        <Timer className="mr-2 h-4 w-4" /> Reservations
      </Button>
      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
        <Coffee className="mr-2 h-4 w-4" /> Quick Serve
      </Button>
      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
        <ChefHat className="mr-2 h-4 w-4" /> Kitchen View
      </Button>
    </div>
  );

  const TableStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Available', value: '4', icon: Check, color: 'text-green-500' },
        { label: 'Occupied', value: '8', icon: Users, color: 'text-blue-500' },
        { label: 'Reserved', value: '3', icon: Timer, color: 'text-orange-500' },
        { label: 'Cleaning', value: '1', icon: Ban, color: 'text-yellow-500' },
      ].map((stat, index) => (
        <Card key={index}>
          <CardContent className="flex items-center p-4">
            <stat.icon className={`h-8 w-8 ${stat.color} mr-3`} />
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tables & Orders</h1>
          <p className="text-gray-600">Manage restaurant tables and customer orders</p>
        </div>
      </div>

      <TableStats />
      <ActionBar />
      <TableGrid />

      {/* Modal placeholder - implement as needed */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Order form would go here */}
        </div>
      )}
    </div>
  );
}