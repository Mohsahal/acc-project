import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarDropdownState, routeToDropdownMap } from '@/lib/sidebar-config';

export const useSidebarDropdown = () => {
  const location = useLocation();
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
      setDropdownState(prev => ({ 
        ...prev, 
        [dropdownToOpen]: true 
      }));
    }
  }, [location.pathname]);

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

  return {
    dropdownState,
    toggleDropdown,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    closeAllDropdowns
  };
}; 