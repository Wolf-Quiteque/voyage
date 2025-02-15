"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDollarSign, Users, Clock, TrendingUp } from 'lucide-react';

// Dummy data
const salesData = [
  { name: 'Mon', sales: 2400 },
  { name: 'Tue', sales: 1398 },
  { name: 'Wed', sales: 3800 },
  { name: 'Thu', sales: 3908 },
  { name: 'Fri', sales: 4800 },
  { name: 'Sat', sales: 5800 },
  { name: 'Sun', sales: 4300 },
];

const popularDishes = [
  { name: 'Margherita Pizza', orders: 145, revenue: 2175 },
  { name: 'Beef Burger', orders: 121, revenue: 1815 },
  { name: 'Caesar Salad', orders: 87, revenue: 957 },
  { name: 'Pasta Carbonara', orders: 76, revenue: 1140 },
];

const Dashboard = () => {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$3,240",
      icon: CircleDollarSign,
      change: "+12.5%",
      color: "text-blue-600",
    },
    {
      title: "Active Tables",
      value: "12/20",
      icon: Users,
      change: "85% capacity",
      color: "text-orange-500",
    },
    {
      title: "Avg. Wait Time",
      value: "24 min",
      icon: Clock,
      change: "-3 min",
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: "164",
      icon: TrendingUp,
      change: "+18.2%",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Restaurant Manager</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-sm ${stat.color}`}>{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Dishes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularDishes.map((dish, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">{dish.name}</p>
                    <p className="text-sm text-gray-500">{dish.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">${dish.revenue}</p>
                    <p className="text-sm text-gray-500">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              New Order
            </button>
            <button className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Manage Tables
            </button>
            <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Reports
            </button>
            <button className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Inventory
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;