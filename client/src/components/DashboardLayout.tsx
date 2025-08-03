import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
  showUserMenu?: boolean;
}

const DashboardLayout = ({ title, children, showUserMenu = true }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-dashboard-header text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-white/20"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        {showUserMenu && (
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
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar onLogout={handleLogout} />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 