import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarDropdownState, routeToDropdownMap } from '@/lib/sidebar-config';

interface SidebarContextType {
  sidebarOpen: boolean;
  dropdownState: SidebarDropdownState;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleDropdown: (dropdownKey: keyof SidebarDropdownState) => void;
  isDropdownOpen: (dropdownKey: keyof SidebarDropdownState) => boolean;
  openDropdown: (dropdownKey: keyof SidebarDropdownState) => void;
  closeDropdown: (dropdownKey: keyof SidebarDropdownState) => void;
  closeAllDropdowns: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownState, setDropdownState] = useState<SidebarDropdownState>({
    createProfile: false,
    clientDetails: false,
    clientStaff: false,
    supplierCustomer: false,
    invoice: false,
  });

  // Auto-open dropdowns based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which dropdown should be open based on current route
    const dropdownToOpen = routeToDropdownMap[currentPath];
    
    if (dropdownToOpen) {
      setDropdownState(prev => {
        // Only update if the dropdown is not already open
        if (!prev[dropdownToOpen]) {
          return { 
            ...prev, 
            [dropdownToOpen]: true 
          };
        }
        return prev;
      });
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleDropdown = (dropdownKey: keyof SidebarDropdownState) => {
    setDropdownState(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  const isDropdownOpen = (dropdownKey: keyof SidebarDropdownState) => {
    return dropdownState[dropdownKey];
  };

  const openDropdown = (dropdownKey: keyof SidebarDropdownState) => {
    setDropdownState(prev => ({
      ...prev,
      [dropdownKey]: true
    }));
  };

  const closeDropdown = (dropdownKey: keyof SidebarDropdownState) => {
    setDropdownState(prev => ({
      ...prev,
      [dropdownKey]: false
    }));
  };

  const closeAllDropdowns = () => {
    setDropdownState({
      createProfile: false,
      clientDetails: false,
      clientStaff: false,
      supplierCustomer: false,
      invoice: false,
    });
  };

  const value: SidebarContextType = {
    sidebarOpen,
    dropdownState,
    toggleSidebar,
    setSidebarOpen,
    toggleDropdown,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    closeAllDropdowns,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}; 