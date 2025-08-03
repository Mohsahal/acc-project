import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, LogOut, FileText } from "lucide-react";
import { sidebarItems, SidebarItem, SubItem } from "@/lib/sidebar-config";
import { useSidebar } from "@/contexts/SidebarContext";

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar = ({ onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    sidebarOpen, 
    toggleDropdown, 
    isDropdownOpen,
    openDropdown
  } = useSidebar();

  const isActiveItem = (item: SidebarItem) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => 
        subItem.path && location.pathname === subItem.path
      );
    }
    return false;
  };

  const isActiveSubItem = (subItem: SubItem) => {
    if (subItem.path && location.pathname === subItem.path) return true;
    return subItem.active || false;
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.hasDropdown && item.dropdownKey) {
      toggleDropdown(item.dropdownKey);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleSubItemClick = (e: React.MouseEvent, subItem: SubItem, parentItem: SidebarItem) => {
    e.stopPropagation();
    
    // Ensure the parent dropdown stays open when clicking on sub-items
    if (parentItem.hasDropdown && parentItem.dropdownKey) {
      openDropdown(parentItem.dropdownKey);
    }
    
    if (subItem.path) {
      // Add a small delay to ensure dropdown state is preserved
      setTimeout(() => {
        navigate(subItem.path!);
      }, 10);
    } else if (subItem.onClick) {
      subItem.onClick();
    }
  };

  return (
    <aside className={`bg-dashboard-sidebar text-dashboard-sidebar-foreground transition-all duration-300 ${
      sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
    }`}>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <FileText className="h-5 w-5" />
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
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActiveItem(item)
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm flex-1">{item.label}</span>
                {item.hasDropdown && item.dropdownKey && (
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 text-gray-300 ${
                    isDropdownOpen(item.dropdownKey) ? 'rotate-90' : ''
                  }`} />
                )}
              </button>
              
              {item.hasDropdown && item.subItems && item.dropdownKey && isDropdownOpen(item.dropdownKey) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={(e) => handleSubItemClick(e, subItem, item)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isActiveSubItem(subItem)
                          ? 'bg-blue-500/20 text-blue-300' 
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
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-white/5 hover:text-white mt-4"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 