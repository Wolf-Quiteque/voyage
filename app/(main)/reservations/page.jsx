'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';

// Dummy data for reservations
const initialReservations = [
  {
    id: 1,
    guest: 'John Smith',
    date: '2025-02-15',
    time: '19:00',
    guests: 4,
    table: 12,
    status: 'confirmed',
    phone: '+1 234-567-8900',
    email: 'john@example.com',
    notes: 'Birthday celebration',
    specialRequests: 'Window seat preferred',
  },
  {
    id: 2,
    guest: 'Sarah Johnson',
    date: '2025-02-15',
    time: '20:00',
    guests: 2,
    table: 5,
    status: 'pending',
    phone: '+1 234-567-8901',
    email: 'sarah@example.com',
    notes: 'First time visitor',
  },
  // Add more dummy reservations
];

export default function ReservationsManagement() {
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedDate, setSelectedDate] = useState('2025-02-15');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddReservation, setShowAddReservation] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const filterReservations = () => {
    return reservations.filter(res => 
      res.date === selectedDate &&
      (res.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
       res.phone.includes(searchQuery) ||
       res.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const ReservationStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Today's Bookings", value: '12', icon: BookOpen, color: 'text-blue-500' },
        { label: 'Pending Confirmation', value: '3', icon: AlertCircle, color: 'text-orange-500' },
        { label: 'Total Guests Expected', value: '45', icon: Users, color: 'text-green-500' },
        { label: 'Available Tables', value: '8', icon: CalendarDays, color: 'text-purple-500' },
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

  const DateNavigation = () => (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
      <Button variant="ghost" onClick={() => {/* Handle date change */}}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous Day
      </Button>
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-600" />
        <span className="text-lg font-semibold">
          {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>
      <Button variant="ghost" onClick={() => {/* Handle date change */}}>
        Next Day
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );

  const ActionBar = () => (
    <div className="flex flex-wrap justify-between gap-4 mb-6">
      <div className="flex gap-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowAddReservation(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> New Reservation
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search reservations..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );

  const TimeSlots = () => (
    <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
      {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => (
        <Button
          key={time}
          variant="outline"
          className={`flex-shrink-0 ${
            time === '19:00' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
          }`}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time}
        </Button>
      ))}
    </div>
  );

  const ReservationsList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filterReservations().map((reservation) => (
        <Card 
          key={reservation.id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setSelectedReservation(reservation)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{reservation.guest}</h3>
                <p className="text-gray-600">
                  <Clock className="inline-block h-4 w-4 mr-1" />
                  {reservation.time} · {reservation.guests} guests · Table {reservation.table}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                reservation.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {reservation.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {reservation.phone}
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {reservation.email}
              </div>
              {reservation.notes && (
                <div className="flex items-start">
                  <MessageSquare className="h-4 w-4 mr-2 mt-1" />
                  <span>{reservation.notes}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                <Check className="h-4 w-4 mr-2" />
                Confirm
              </Button>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
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
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600">Manage your restaurant's bookings and tables</p>
        </div>
      </div>

      <ReservationStats />
      <DateNavigation />
      <ActionBar />
      <TimeSlots />
      <ReservationsList />

      {/* Modal placeholder - implement as needed */}
      {showAddReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Add/Edit form would go here */}
        </div>
      )}
    </div>
  );
}