import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  ChevronRight,
  Home,
  Edit
} from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const ClientStaff = () => {
  const clientStaffData = [
    { 
      id: 1, 
      clientName: "Zeigets", 
      staffName: "nephy k", 
      dateOfJoining: "2023-12-12", 
      phone1: "9895814599", 
      status: "active",
      createdDate: "2022-07-07"
    },
    { 
      id: 2, 
      clientName: "Zeigets", 
      staffName: "nephy", 
      dateOfJoining: "2020-02-04", 
      phone1: "+971501234567", 
      status: "active",
      createdDate: "2023-12-12"
    }
  ];

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Client Staff</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Client Staff</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zeigets">Zeigets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
              <Input placeholder="Enter staff name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="assistant">Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Search
            </Button>
            <Button variant="outline">
              Reset
            </Button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Showing 1-2 of 2 items.</p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead className="text-blue-600">Staff Name</TableHead>
                <TableHead className="text-blue-600">Date Of Joining</TableHead>
                <TableHead className="text-blue-600">Phone1</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead className="text-blue-600">Created Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientStaffData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.clientName}</TableCell>
                  <TableCell className="text-blue-600">{item.staffName}</TableCell>
                  <TableCell className="text-blue-600">{item.dateOfJoining}</TableCell>
                  <TableCell className="text-blue-600">{item.phone1}</TableCell>
                  <TableCell className="text-blue-600">{item.status}</TableCell>
                  <TableCell className="text-blue-600">{item.createdDate}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Copyright © 2013-2025 <span className="text-blue-600">Zeigets.</span> All rights reserved. v2.170322
        <span className="float-right">Version 2.2</span>
      </div>
    </DashboardLayout>
  );
};

export default ClientStaff;