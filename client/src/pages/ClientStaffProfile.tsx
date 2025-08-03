import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronRight,
  CalendarIcon,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

const ClientStaffProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: "",
    client: "",
    email: "",
    staffName: "",
    password: "",
    designation: "",
    role: "",
    dateOfJoining: "",
    status: "",
    salary: "",
    address: "",
    phone1: "+971 50 123 4567",
    phone2: "+971 50 123 4567",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {[key: string]: string} = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username cannot be blank.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be blank.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password cannot be blank.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast({
      title: "Client Staff Profile Created",
      description: "Client staff profile has been created successfully!",
    });
    
    // Reset form
    setFormData({
      username: "",
      client: "",
      email: "",
      staffName: "",
      password: "",
      designation: "",
      role: "",
      dateOfJoining: "",
      status: "",
      salary: "",
      address: "",
      phone1: "+971 50 123 4567",
      phone2: "+971 50 123 4567",
    });
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Client Staff Profile</span>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <span>Client Staff Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className={errors.username ? 'border-red-500' : ''}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <Label htmlFor="client" className="text-gray-700 font-medium">
                  Client
                </Label>
                <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client1">Client 1</SelectItem>
                    <SelectItem value="client2">Client 2</SelectItem>
                    <SelectItem value="client3">Client 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="staffName" className="text-gray-700 font-medium">
                  Staff Name
                </Label>
                <Input
                  id="staffName"
                  value={formData.staffName}
                  onChange={(e) => handleInputChange("staffName", e.target.value)}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <Label htmlFor="designation" className="text-gray-700 font-medium">
                  Designation
                </Label>
                <Select value={formData.designation} onValueChange={(value) => handleInputChange("designation", value)}>
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
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="role" className="text-gray-700 font-medium">
                  Role
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select One--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateOfJoining" className="text-gray-700 font-medium">
                  Date Of Joining
                </Label>
                <div className="relative">
                  <Input
                    id="dateOfJoining"
                    type="date"
                    value={formData.dateOfJoining}
                    onChange={(e) => handleInputChange("dateOfJoining", e.target.value)}
                    className="pl-10"
                    placeholder="Select Joining Date"
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <X className="absolute right-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="status" className="text-gray-700 font-medium">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select One--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salary" className="text-gray-700 font-medium">
                  Salary
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                />
              </div>
            </div>

            {/* Address Row */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="address" className="text-gray-700 font-medium">
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Phone Numbers Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone1" className="text-gray-700 font-medium">
                  phone1 🇦🇪
                </Label>
                <Input
                  id="phone1"
                  value={formData.phone1}
                  onChange={(e) => handleInputChange("phone1", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone2" className="text-gray-700 font-medium">
                  phone2 🇦🇪
                </Label>
                <Input
                  id="phone2"
                  value={formData.phone2}
                  onChange={(e) => handleInputChange("phone2", e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start">
              <Button 
                type="submit" 
                className="bg-success hover:bg-success/90 text-white px-8"
              >
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Copyright © 2013-2025 Zeigets. All rights reserved. v2.170322
        <span className="float-right">Version 2.2</span>
      </div>
    </DashboardLayout>
  );
};

export default ClientStaffProfile;