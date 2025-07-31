import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
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
  ChevronRight,
  FileText
} from "lucide-react";

const ViewUsers = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createProfileOpen, setCreateProfileOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { 
      icon: UserPlus, 
      label: "Create Profile", 
      path: "/create-profile",
      hasDropdown: true,
      isOpen: createProfileOpen,
      subItems: [
        { label: "Client", path: "/create-profile" },
        { label: "Client Staff", path: "/client-staff-profile" },
        { label: "Zigma Staff", path: "/zigma-staff-profile" },
        { label: "View Users", path: "/view-users", active: true },
      ]
    },
    { icon: UserCheck, label: "Client Details", path: "/client-details" },
    { icon: Users, label: "Client Staff", path: "/client-staff" },
    { icon: Receipt, label: "Supplier Customer", path: "/supplier-customer" },
    { icon: FileText, label: "Invoice", path: "/invoice" },
    { icon: CheckSquare, label: "Check Invoice", path: "/check-invoice" },
    { icon: Calendar, label: "Vat Return Date", path: "/vat-return-date" },
    { icon: BarChart3, label: "Vat Return", path: "/vat-return" },
    { icon: Calendar, label: "Vat Return This Month", path: "/vat-return-month" },
    { icon: FileText, label: "Vat Return This Month All", path: "/vat-return-month-all" },
    { icon: Settings, label: "Designation", path: "/designation" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Activity, label: "Staff Activity", path: "/staff-activity" },
  ];

  const users = [
    {
      id: 1,
      email: "hamasatr55@gmail.com",
      staffName: "",
      clientName: "",
      address: "",
      phone: "",
      trnNumber: "",
      phone1: "",
      phone2: "",
      location: "",
      ftaUsername: "",
      ftaPassword: "",
      status: "Active"
    },
    {
      id: 2,
      email: "mdstarqm@gmail.com",
      staffName: "",
      clientName: "QASR ALMAHABA TRADING L.L.C",
      address: "SHOP NO5 ALAM YUSUF ALAM MUHA...",
      phone: "",
      trnNumber: "104674511100003",
      phone1: "+971542990828",
      phone2: "+971542990828",
      location: "Dubai",
      ftaUsername: "mdstarqm@gmail.com",
      ftaPassword: "Vat@zigma123",
      status: "Active"
    },
    {
      id: 3,
      email: "technicalserviceshumaidjassim@gmail...",
      staffName: "",
      clientName: "HUMAID JASSIM TECHNICAL ...",
      address: "OFFICE 04-0125 ARAB BANK BUILDIN...",
      phone: "",
      trnNumber: "104588701300003",
      phone1: "+971529060465",
      phone2: "+971529060465",
      location: "Dubai",
      ftaUsername: "technicalserviceshumaidjassi...",
      ftaPassword: "Vat@zigma123",
      status: "Active"
    }
  ];

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
                        setCreateProfileOpen(!createProfileOpen);
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronRight className={`h-4 w-4 transition-transform ${createProfileOpen ? 'rotate-90' : ''}`} />
                    )}
                  </button>
                  
                  {item.hasDropdown && item.subItems && createProfileOpen && (
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
              <span>Users</span>
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user) => (
              <Card key={user.id} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {user.email}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Status</span>
                      <span className="text-blue-600">{user.status}</span>
                    </div>

                    {user.staffName && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Staff Name</span>
                        <span className="text-gray-600">{user.staffName}</span>
                      </div>
                    )}

                    {user.clientName && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Client Name</span>
                        <span className="text-blue-600">{user.clientName}</span>
                      </div>
                    )}

                    {user.address && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Address</span>
                        <span className="text-gray-600 text-right max-w-[150px] truncate">{user.address}</span>
                      </div>
                    )}

                    {user.trnNumber && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">TRN Number</span>
                        <span className="text-gray-600">{user.trnNumber}</span>
                      </div>
                    )}

                    {user.phone1 && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Phone1</span>
                        <span className="text-blue-600">{user.phone1}</span>
                      </div>
                    )}

                    {user.phone2 && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Phone2</span>
                        <span className="text-blue-600">{user.phone2}</span>
                      </div>
                    )}

                    {user.location && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Location</span>
                        <span className="text-blue-600">{user.location}</span>
                      </div>
                    )}

                    {user.ftaUsername && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">FTA Username</span>
                        <span className="text-gray-600 text-right max-w-[150px] truncate">{user.ftaUsername}</span>
                      </div>
                    )}

                    {user.ftaPassword && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">FTA Password</span>
                        <span className="text-gray-600">{user.ftaPassword}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-gray-100 rounded mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Update
                    </Button>
                    <Button 
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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

export default ViewUsers;