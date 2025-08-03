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
  DollarSign, 
  FileText, 
  ChevronRight,
  Settings,
  LogOut,
  Home,
  UserPlus,
  UserCheck,
  Receipt,
  CheckSquare,
  Calendar,
  BarChart3,
  Activity,
  Menu,
  Upload,
  X,
  CalendarIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
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

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  const [createProfileOpen, setCreateProfileOpen] = useState(true);
  const [clientDetailsOpen, setClientDetailsOpen] = useState(false);
  const [clientStaffOpen, setClientStaffOpen] = useState(false);
  const [supplierCustomerOpen, setSupplierCustomerOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { 
      icon: UserPlus, 
      label: "Create Profile", 
      path: "/create-profile",
      hasDropdown: true,
      isOpen: createProfileOpen,
      subItems: [
        { label: "Client", path: "/create-profile", active: true },
        { label: "Client Staff", path: "/client-staff-profile" },
        { label: "Zigma Staff", path: "/zigma-staff-profile" },
        { label: "View Users", path: "/view-users" },
      ]
    },
    { icon: UserCheck, label: "Client Details", path: "/client-details" },
    { icon: Users, label: "Client Staff", path: "/client-staff" },
    { icon: Receipt, label: "Supplier Customer", path: "/supplier-customer" },
    { icon: FileText, label: "Invoice", path: "/invoice", hasDropdown: true, isOpen: invoiceOpen, subItems: [
      { label: "Create Single Invoice", path: "/invoice/create-single" },
      { label: "Create Multiple Invoice", path: "/invoice/create-multiple" },
      { label: "New Multiple Invoice", path: "/invoice/new-multiple" },
      { label: "Pending Invoice", path: "/invoice/pending" },
      { label: "View", path: "/invoice/view" },
      { label: "Invoice Status", path: "/invoice/status" },
      { label: "Invoice Month Wise", path: "/invoice/month-wise" },
    ] },
    { icon: CheckSquare, label: "Check Invoice", path: "/check-invoice" },
    { icon: Calendar, label: "Vat Return Date", path: "/vat-return-date" },
    { icon: BarChart3, label: "Vat Return", path: "/vat-return" },
    { icon: Calendar, label: "Vat Return This Month", path: "/vat-return-month" },
    { icon: FileText, label: "Vat Return This Month All", path: "/vat-return-month-all" },
    { icon: Settings, label: "Designation", path: "/designation" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Activity, label: "Staff Activity", path: "/staff-activity" },
  ];

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-dashboard-header text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/20"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">AdminPanel</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <span>admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-dashboard-sidebar text-dashboard-sidebar-foreground transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}>
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Admin</div>
                <div className="text-sm text-green-400">● Online</div>
              </div>
            </div>
            
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      if (item.hasDropdown) {
                        if (item.label === "Create Profile") {
                          setCreateProfileOpen(!createProfileOpen);
                        } else if (item.label === "Client Details") {
                          setClientDetailsOpen(!clientDetailsOpen);
                        } else if (item.label === "Client Staff") {
                          setClientStaffOpen(!clientStaffOpen);
                        } else if (item.label === "Supplier Customer") {
                          setSupplierCustomerOpen(!supplierCustomerOpen);
                        } else if (item.label === "Invoice") {
                          setInvoiceOpen(!invoiceOpen);
                        }
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronRight className={`h-4 w-4 transition-transform duration-200 text-gray-300 ${
                        (item.label === "Create Profile" && createProfileOpen) || 
                        (item.label === "Client Details" && clientDetailsOpen) ||
                        (item.label === "Client Staff" && clientStaffOpen) ||
                        (item.label === "Supplier Customer" && supplierCustomerOpen) ||
                        (item.label === "Invoice" && invoiceOpen)
                          ? 'rotate-90' : ''
                      }`} />
                    )}
                  </button>
                  
                  {item.hasDropdown && item.subItems && (
                    ((item.label === "Create Profile" && createProfileOpen) || 
                     (item.label === "Client Details" && clientDetailsOpen) ||
                     (item.label === "Client Staff" && clientStaffOpen) ||
                     (item.label === "Supplier Customer" && supplierCustomerOpen) ||
                     (item.label === "Invoice" && invoiceOpen)) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => navigate(subItem.path)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            subItem.active 
                              ? 'bg-white/10 text-white' 
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                    )
                  )}
                </div>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-white/5 hover:text-white mt-4"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
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
        </main>
      </div>
    </div>
  );
};

export default CreateProfile;