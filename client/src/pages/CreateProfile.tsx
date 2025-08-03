import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  ChevronRight,
  Upload,
  X,
  CalendarIcon,
  Home
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

const CreateProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: "",
    clientName: "",
    email: "",
    legalEntity: "",
    password: "",
    clientAddress: "",
    role: "",
    status: "",
    trnNumber: "",
    phone1: "+971 50 123 4567",
    phone2: "+971 50 123 4567",
    giban: "",
    ftaUsername: "",
    vatReturnDueDate: "",
    location: "",
    ftaPassword: "",
    taxPeriod1From: "",
    taxPeriod1To: "",
    taxPeriod2From: "",
    taxPeriod2To: "",
    taxPeriod3From: "",
    taxPeriod3To: "",
    taxPeriod4From: "",
    taxPeriod4To: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [uploadedFiles, setUploadedFiles] = useState({
    tradeLicense: null as File | null,
    agreement: null as File | null,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (type: 'tradeLicense' | 'agreement', file: File) => {
    setUploadedFiles(prev => ({ ...prev, [type]: file }));
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
      title: "Profile Created",
      description: "Client profile has been created successfully!",
    });
    
    // Reset form
    setFormData({
      username: "",
      clientName: "",
      email: "",
      legalEntity: "",
      password: "",
      clientAddress: "",
      role: "",
      status: "",
      trnNumber: "",
      phone1: "+971 50 123 4567",
      phone2: "+971 50 123 4567",
      giban: "",
      ftaUsername: "",
      vatReturnDueDate: "",
      location: "",
      ftaPassword: "",
      taxPeriod1From: "",
      taxPeriod1To: "",
      taxPeriod2From: "",
      taxPeriod2To: "",
      taxPeriod3From: "",
      taxPeriod3To: "",
      taxPeriod4From: "",
      taxPeriod4To: "",
    });
    setUploadedFiles({ tradeLicense: null, agreement: null });
  };

  const FileUploadArea = ({ title, type }: { title: string; type: 'tradeLicense' | 'agreement' }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{title}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
        <div className="space-y-2">
          <Upload className="h-8 w-8 text-gray-400 mx-auto" />
          <p className="text-gray-500">Drag & drop files here ...</p>
          <div className="flex justify-center space-x-2 mt-4">
            <Button variant="outline" size="sm">
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => document.getElementById(`file-${type}`)?.click()}
            >
              Select Image
            </Button>
          </div>
        </div>
        <input
          id={`file-${type}`}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(type, file);
          }}
        />
        {uploadedFiles[type] && (
          <p className="text-sm text-green-600 mt-2">
            Uploaded: {uploadedFiles[type]?.name}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Create Profile</span>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Client Profile</span>
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
                <Label htmlFor="clientName" className="text-gray-700 font-medium">
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
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
                <Label htmlFor="legalEntity" className="text-gray-700 font-medium">
                  Legal Entity
                </Label>
                <Input
                  id="legalEntity"
                  value={formData.legalEntity}
                  onChange={(e) => handleInputChange("legalEntity", e.target.value)}
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
                <Label htmlFor="clientAddress" className="text-gray-700 font-medium">
                  Client Address
                </Label>
                <Textarea
                  id="clientAddress"
                  value={formData.clientAddress}
                  onChange={(e) => handleInputChange("clientAddress", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="trnNumber" className="text-gray-700 font-medium">
                  Trn Number
                </Label>
                <Input
                  id="trnNumber"
                  value={formData.trnNumber}
                  onChange={(e) => handleInputChange("trnNumber", e.target.value)}
                />
              </div>
            </div>

            {/* Phone Numbers Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  Phone2 🇦🇪
                </Label>
                <Input
                  id="phone2"
                  value={formData.phone2}
                  onChange={(e) => handleInputChange("phone2", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="giban" className="text-gray-700 font-medium">
                  Giban
                </Label>
                <Input
                  id="giban"
                  value={formData.giban}
                  onChange={(e) => handleInputChange("giban", e.target.value)}
                />
              </div>
            </div>

            {/* FTA Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="ftaUsername" className="text-gray-700 font-medium">
                  FTA Username
                </Label>
                <Input
                  id="ftaUsername"
                  value={formData.ftaUsername}
                  onChange={(e) => handleInputChange("ftaUsername", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="vatReturnDueDate" className="text-gray-700 font-medium">
                  Vat Return Due Date
                </Label>
                <div className="relative">
                  <Input
                    id="vatReturnDueDate"
                    type="date"
                    value={formData.vatReturnDueDate}
                    onChange={(e) => handleInputChange("vatReturnDueDate", e.target.value)}
                    className="pl-10"
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <Label htmlFor="location" className="text-gray-700 font-medium">
                  Location
                </Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Your Emirate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                    <SelectItem value="ajman">Ajman</SelectItem>
                    <SelectItem value="rak">Ras Al Khaimah</SelectItem>
                    <SelectItem value="fujairah">Fujairah</SelectItem>
                    <SelectItem value="uaq">Umm Al Quwain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* FTA Password */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="ftaPassword" className="text-gray-700 font-medium">
                  FTA Password
                </Label>
                <Input
                  id="ftaPassword"
                  type="password"
                  value={formData.ftaPassword}
                  onChange={(e) => handleInputChange("ftaPassword", e.target.value)}
                />
              </div>
            </div>

            {/* Tax Periods */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Tax Periods</h3>
              
              {[1, 2, 3, 4].map((period) => (
                <div key={period} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-700 font-medium">
                      Tax Period{period} From
                    </Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={formData[`taxPeriod${period}From` as keyof typeof formData]}
                        onChange={(e) => handleInputChange(`taxPeriod${period}From`, e.target.value)}
                        className="pl-10"
                      />
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">
                      Tax Period{period} To
                    </Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={formData[`taxPeriod${period}To` as keyof typeof formData]}
                        onChange={(e) => handleInputChange(`taxPeriod${period}To`, e.target.value)}
                        className="pl-10"
                      />
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadArea title="Upload Tradel Licence" type="tradeLicense" />
              <FileUploadArea title="Upload Agreement" type="agreement" />
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

export default CreateProfile;