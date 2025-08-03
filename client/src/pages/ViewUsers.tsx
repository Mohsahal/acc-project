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
  Home,
  ChevronRight,
  FileText,
  Edit,
  Eye,
  Trash2,
  Plus
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const ViewUsers = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users = [
    {
      id: 1,
      email: "hamasatr55@gmail.com",
      staffName: "Hamas Atr",
      clientName: "Zeigets",
      address: "Dubai, UAE",
      phone: "+971 50 123 4567",
      trnNumber: "123456789",
      phone1: "+971 50 123 4567",
      phone2: "+971 50 987 6543",
      location: "Dubai",
      ftaUsername: "hamas_fta",
      ftaPassword: "********",
      status: "Active"
    },
    {
      id: 2,
      email: "mdstarqm@gmail.com",
      staffName: "Md Star",
      clientName: "Tech Solutions",
      address: "Abu Dhabi, UAE",
      phone: "+971 50 987 6543",
      trnNumber: "987654321",
      phone1: "+971 50 987 6543",
      phone2: "+971 50 123 4567",
      location: "Abu Dhabi",
      ftaUsername: "mdstar_fta",
      ftaPassword: "********",
      status: "Active"
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id.toString()));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleMultipleDelete = () => {
    console.log("Deleting users:", selectedUsers);
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>View Users</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">View Users</h2>
            </div>
            <Button className="bg-success hover:bg-success/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input placeholder="Enter email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zeigets">Zeigets</SelectItem>
                  <SelectItem value="tech-solutions">Tech Solutions</SelectItem>
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
            {selectedUsers.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleMultipleDelete}
              >
                Delete Selected ({selectedUsers.length})
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
                    checked={selectedUsers.length === users.length}
                  />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-blue-600">Staff Name</TableHead>
                <TableHead className="text-blue-600">Client Name</TableHead>
                <TableHead className="text-blue-600">Phone</TableHead>
                <TableHead className="text-blue-600">TRN Number</TableHead>
                <TableHead className="text-blue-600">Location</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id.toString())}
                      onChange={() => handleUserSelect(user.id.toString())}
                    />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-blue-600">{user.staffName}</TableCell>
                  <TableCell className="text-blue-600">{user.clientName}</TableCell>
                  <TableCell className="text-blue-600">{user.phone}</TableCell>
                  <TableCell className="text-blue-600">{user.trnNumber}</TableCell>
                  <TableCell className="text-blue-600">{user.location}</TableCell>
                  <TableCell className="text-blue-600">{user.status}</TableCell>
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

export default ViewUsers;