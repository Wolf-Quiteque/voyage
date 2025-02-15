"use client"
import React, { useState } from 'react';
import { 
  Calendar,
  Users,
  Clock,
  UserPlus,
  ChefHat,
  Utensils,
  Coffee,
  DollarSign,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  Check,
  X,
  MoreVertical
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy employee data
const employees = [
  {
    id: 1,
    name: "John Smith",
    role: "Head Chef",
    department: "Kitchen",
    email: "john.smith@restaurant.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    hourlyRate: 28.50,
    hoursThisWeek: 38,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    avatar: "/api/placeholder/32/32",
    certifications: ["Food Safety", "Kitchen Management"],
    startDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Server",
    department: "Front of House",
    email: "sarah.j@restaurant.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    hourlyRate: 18.50,
    hoursThisWeek: 32,
    availability: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    avatar: "/api/placeholder/32/32",
    certifications: ["Alcohol Service"],
    startDate: "2024-02-01"
  },
  // Add more employees as needed
];

// Dummy schedule data
const scheduleData = [
  {
    id: 1,
    employeeId: 1,
    day: "Monday",
    shift: "Morning",
    startTime: "06:00",
    endTime: "14:00",
    position: "Head Chef",
    status: "confirmed"
  },
  {
    id: 2,
    employeeId: 2,
    day: "Monday",
    shift: "Evening",
    startTime: "16:00",
    endTime: "23:00",
    position: "Server",
    status: "pending"
  },
  // Add more shifts as needed
];

// Weekly schedule template
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const shifts = ["Morning (6AM-2PM)", "Afternoon (2PM-10PM)", "Evening (4PM-12AM)"];

const StaffSchedule = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [schedule, setSchedule] = useState(scheduleData);
  const [search, setSearch] = useState("");

  // Calculate summary statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === "active").length;
  const totalHoursThisWeek = employees.reduce((sum, emp) => sum + emp.hoursThisWeek, 0);
  const averageHoursPerEmployee = totalHoursThisWeek / activeEmployees;

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-500",
      inactive: "bg-gray-500",
      pending: "bg-orange-500",
      confirmed: "bg-blue-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const getDepartmentIcon = (department) => {
    switch (department.toLowerCase()) {
      case "kitchen":
        return <ChefHat className="w-4 h-4" />;
      case "front of house":
        return <Utensils className="w-4 h-4" />;
      case "bar":
        return <Coffee className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Staff Schedule & HR Management</h1>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <UserPlus className="w-4 h-4 mr-2" /> Add Employee
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-gray-500">{activeEmployees} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hours This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHoursThisWeek}h</div>
            <p className="text-xs text-gray-500">{averageHoursPerEmployee.toFixed(1)}h avg/employee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Shifts Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">2 pending confirmations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time Off Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">3</div>
            <p className="text-xs text-gray-500">Pending approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="schedule" className="mb-6">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="timeoff">Time Off</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          {/* Schedule Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last">Last Week</SelectItem>
                <SelectItem value="current">Current Week</SelectItem>
                <SelectItem value="next">Next Week</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="front">Front of House</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Weekly Schedule Grid */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shift</TableHead>
                      {weekDays.map(day => (
                        <TableHead key={day}>{day}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shifts.map(shift => (
                      <TableRow key={shift}>
                        <TableCell className="font-medium">{shift}</TableCell>
                        {weekDays.map(day => (
                          <TableCell key={day} className="min-w-[200px]">
                            {schedule
                              .filter(s => s.day === day && s.shift.includes(shift.split(" ")[0]))
                              .map(s => {
                                const employee = employees.find(e => e.id === s.employeeId);
                                return (
                                  <div key={s.id} className="mb-2 p-2 bg-gray-50 rounded-md">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={employee?.avatar}
                                        alt={employee?.name}
                                        className="w-6 h-6 rounded-full"
                                      />
                                      <span className="font-medium">{employee?.name}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {s.startTime} - {s.endTime}
                                    </div>
                                    <Badge className={getStatusColor(s.status)}>
                                      {s.status}
                                    </Badge>
                                  </div>
                                );
                              })}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          {/* Employee List */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search employees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map(employee => (
              <Card key={employee.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <CardDescription>{employee.role}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getDepartmentIcon(employee.department)}
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{employee.hoursThisWeek}h this week</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {employee.certifications.map(cert => (
                        <Badge key={cert} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeoff">
          <Card>
            <CardContent>
              <div className="text-center p-8 text-gray-500">
                Time off requests management can be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardContent>
              <div className="text-center p-8 text-gray-500">
                Staff reports and analytics can be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffSchedule;