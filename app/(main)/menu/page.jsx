'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ChefHat,
  Tag,
  DollarSign,
  Coffee,
  Utensils,
  Pizza,
  Wine,
  IceCream,
  FileEdit,
  Eye,
  MoreVertical,
} from 'lucide-react';

// Dummy data for menu items
const initialCategories = [
  { id: 1, name: 'Starters', icon: Coffee },
  { id: 2, name: 'Main Course', icon: Utensils },
  { id: 3, name: 'Pizza', icon: Pizza },
  { id: 4, name: 'Beverages', icon: Wine },
  { id: 5, name: 'Desserts', icon: IceCream },
];

const initialMenuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 14.99,
    description: 'Fresh tomatoes, mozzarella, basil, olive oil',
    image: '/api/placeholder/100/100',
    available: true,
    popular: true,
  },
  {
    id: 2,
    name: 'Caesar Salad',
    category: 'Starters',
    price: 8.99,
    description: 'Romaine lettuce, croutons, parmesan cheese, caesar dressing',
    image: '/api/placeholder/100/100',
    available: true,
    popular: false,
  },
  // Add more dummy items as needed
];

export default function MenuManagement() {
  const [categories, setCategories] = useState(initialCategories);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const MenuStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Total Items', value: menuItems.length, icon: Utensils, color: 'text-blue-500' },
        { label: 'Categories', value: categories.length, icon: Tag, color: 'text-orange-500' },
        { label: 'Popular Items', value: menuItems.filter(item => item.popular).length, icon: ChefHat, color: 'text-green-500' },
        { label: 'Average Price', value: `$${(menuItems.reduce((acc, item) => acc + item.price, 0) / menuItems.length).toFixed(2)}`, icon: DollarSign, color: 'text-purple-500' },
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

  const CategoryTabs = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        onClick={() => setSelectedCategory('all')}
        className={selectedCategory === 'all' ? 'bg-blue-600 hover:bg-blue-700' : ''}
      >
        All Items
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.name ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(category.name)}
          className={selectedCategory === category.name ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          <category.icon className="mr-2 h-4 w-4" />
          {category.name}
        </Button>
      ))}
    </div>
  );

  const ActionBar = () => (
    <div className="flex flex-wrap justify-between gap-4 mb-6">
      <div className="flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddItem(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
        <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
          <FileEdit className="mr-2 h-4 w-4" /> Manage Categories
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search menu items..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );

  const MenuItemGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <span className="text-sm text-gray-500">{item.category}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              {item.popular && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Popular
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
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
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant's menu items and categories</p>
        </div>
      </div>

      <MenuStats />
      <ActionBar />
      <CategoryTabs />
      <MenuItemGrid />

      {/* Modal placeholder - implement as needed */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Add/Edit form would go here */}
        </div>
      )}
    </div>
  );
}