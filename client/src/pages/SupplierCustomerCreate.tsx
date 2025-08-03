import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  ChevronRight,
  Home,
  FileText,
  Edit,
  Trash2,
  Phone,
  MapPin,
  User,
  Building2,
  X,
  Save
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const SupplierCustomerCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "",
    status: "",
    company: "",
    contactPerson: "",
    website: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: {[key: string]: string} = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be blank.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be blank.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone cannot be blank.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Creating supplier/customer:", formData);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "",
      status: "",
      company: "",
      contactPerson: "",
      website: ""
    });
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Supplier Customer Create</span>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Create Supplier/Customer</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <Input
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  placeholder="Enter contact person name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="Enter website URL"
                />
              </div>
            </div>

            {/* Address Row */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  placeholder="Enter full address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start">
              <Button 
                type="submit" 
                className="bg-success hover:bg-success/90 text-white px-8"
              >
                <Save className="h-4 w-4 mr-2" />
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

export default SupplierCustomerCreate; 