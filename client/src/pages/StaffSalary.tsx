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
  Plus,
  DollarSign
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const StaffSalary = () => {
  const navigate = useNavigate();
  const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);

  const salaryData = [
    { 
      id: 1, 
      staffName: "John Doe", 
      designation: "Manager", 
      basicSalary: "5000.00", 
      allowances: "1000.00",
      totalSalary: "6000.00",
      month: "January 2024",
      status: "Paid"
    },
    { 
      id: 2, 
      staffName: "Jane Smith", 
      designation: "Accountant", 
      basicSalary: "4000.00", 
      allowances: "800.00",
      totalSalary: "4800.00",
      month: "January 2024",
      status: "Pending"
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSalaries(salaryData.map(salary => salary.id.toString()));
    } else {
      setSelectedSalaries([]);
    }
  };

  const handleSalarySelect = (salaryId: string) => {
    setSelectedSalaries(prev => 
      prev.includes(salaryId) 
        ? prev.filter(id => id !== salaryId)
        : [...prev, salaryId]
    );
  };

  const handleMultipleDelete = () => {
    console.log("Deleting salaries:", selectedSalaries);
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Staff Salary</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Staff Salary</h2>
            </div>
            <Button className="bg-success hover:bg-success/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Salary
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
              <Input placeholder="Enter staff name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January 2024</SelectItem>
                  <SelectItem value="february">February 2024</SelectItem>
                  <SelectItem value="march">March 2024</SelectItem>
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
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
            {selectedSalaries.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleMultipleDelete}
              >
                Delete Selected ({selectedSalaries.length})
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
                    checked={selectedSalaries.length === salaryData.length}
                  />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Staff Name</TableHead>
                <TableHead className="text-blue-600">Designation</TableHead>
                <TableHead className="text-blue-600">Basic Salary</TableHead>
                <TableHead className="text-blue-600">Allowances</TableHead>
                <TableHead className="text-blue-600">Total Salary</TableHead>
                <TableHead className="text-blue-600">Month</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaryData.map((salary) => (
                <TableRow key={salary.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedSalaries.includes(salary.id.toString())}
                      onChange={() => handleSalarySelect(salary.id.toString())}
                    />
                  </TableCell>
                  <TableCell>{salary.id}</TableCell>
                  <TableCell>{salary.staffName}</TableCell>
                  <TableCell className="text-blue-600">{salary.designation}</TableCell>
                  <TableCell className="text-blue-600">{salary.basicSalary}</TableCell>
                  <TableCell className="text-blue-600">{salary.allowances}</TableCell>
                  <TableCell className="text-blue-600">{salary.totalSalary}</TableCell>
                  <TableCell className="text-blue-600">{salary.month}</TableCell>
                  <TableCell className="text-blue-600">{salary.status}</TableCell>
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

export default StaffSalary; 