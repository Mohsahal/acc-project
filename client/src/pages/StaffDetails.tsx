import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Edit,
  Eye,
  Trash2,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/DashboardLayout";

const StaffDetails = () => {
  const navigate = useNavigate();
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);

  const staffData = [
    { 
      id: 1, 
      staffName: "John Doe", 
      designation: "Manager", 
      phone: "+971 50 123 4567", 
      email: "john@example.com",
      status: "Active",
      joiningDate: "2023-01-15"
    },
    { 
      id: 2, 
      staffName: "Jane Smith", 
      designation: "Accountant", 
      phone: "+971 50 987 6543", 
      email: "jane@example.com",
      status: "Active",
      joiningDate: "2023-02-20"
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStaff(staffData.map(staff => staff.id.toString()));
    } else {
      setSelectedStaff([]);
    }
  };

  const handleStaffSelect = (staffId: string) => {
    setSelectedStaff(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleMultipleDelete = () => {
    console.log("Deleting staff:", selectedStaff);
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Staff Details</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Staff Details</h2>
            </div>
            <Button className="bg-success hover:bg-success/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
              <Input placeholder="Enter staff name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="assistant">Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
            {selectedStaff.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleMultipleDelete}
              >
                Delete Selected ({selectedStaff.length})
              </Button>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Showing 1-2 of 2 items.</p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedStaff.length === staffData.length}
                  />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Staff Name</TableHead>
                <TableHead className="text-blue-600">Designation</TableHead>
                <TableHead className="text-blue-600">Phone</TableHead>
                <TableHead className="text-blue-600">Email</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead className="text-blue-600">Joining Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffData.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedStaff.includes(staff.id.toString())}
                      onChange={() => handleStaffSelect(staff.id.toString())}
                    />
                  </TableCell>
                  <TableCell>{staff.id}</TableCell>
                  <TableCell>{staff.staffName}</TableCell>
                  <TableCell className="text-blue-600">{staff.designation}</TableCell>
                  <TableCell className="text-blue-600">{staff.phone}</TableCell>
                  <TableCell className="text-blue-600">{staff.email}</TableCell>
                  <TableCell className="text-blue-600">{staff.status}</TableCell>
                  <TableCell className="text-blue-600">{staff.joiningDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

export default StaffDetails;