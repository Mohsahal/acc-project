import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Home,
  ChevronRight,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

const ZigmaStaffProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    password: "",
    phone: "+971 50 123 4567",
    role: "",
    status: "",
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
    
    // Basic validation
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
      title: "Zigma Staff Profile Created",
      description: "Zigma staff profile has been created successfully!",
    });
    
    // Reset form
    setFormData({
      username: "",
      name: "",
      email: "",
      address: "",
      password: "",
      phone: "+971 50 123 4567",
      role: "",
      status: "",
    });
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Zigma Staff Profile</span>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Zigma Staff Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="username" className="text-red-500 font-medium">
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
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
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
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone 🇦🇪
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
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
            </div>

            {/* Row 4 */}
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
        Copyright © 2013-2025 <span className="text-blue-600">Zeigets.</span> All rights reserved. v2.170322
        <span className="float-right">Version 2.2</span>
      </div>
    </DashboardLayout>
  );
};

export default ZigmaStaffProfile;