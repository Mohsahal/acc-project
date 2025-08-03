import { 
  Users, 
  Home,
  UserPlus,
  UserCheck,
  Receipt,
  CheckSquare,
  Calendar,
  BarChart3,
  Activity,
  FileText,
  Settings
} from "lucide-react";

export interface SubItem {
  label: string;
  path?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface SidebarItem {
  icon: any;
  label: string;
  path?: string;
  hasDropdown?: boolean;
  dropdownKey?: keyof SidebarDropdownState;
  subItems?: SubItem[];
}

export interface SidebarDropdownState {
  createProfile: boolean;
  clientDetails: boolean;
  clientStaff: boolean;
  supplierCustomer: boolean;
  invoice: boolean;
}

// Route to dropdown mapping for auto-opening dropdowns
export const routeToDropdownMap: Record<string, keyof SidebarDropdownState> = {
  '/create-profile': 'createProfile',
  '/client-staff-profile': 'createProfile',
  '/zigma-staff-profile': 'createProfile',
  '/view-users': 'createProfile',
  '/client-details': 'clientDetails',
  '/staff-details': 'clientStaff',
  '/staff-salary': 'clientStaff',
  '/staff-document': 'clientStaff',
  '/supplier-customer/create': 'supplierCustomer',
  '/supplier-customer/view': 'supplierCustomer',
  '/invoice/create-single': 'invoice',
  '/invoice/create-multiple': 'invoice',
  '/invoice/new-multiple': 'invoice',
  '/invoice/pending': 'invoice',
  '/invoice/view': 'invoice',
  '/invoice/status': 'invoice',
  '/invoice/month-wise': 'invoice',
};

export const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { 
    icon: UserPlus, 
    label: "Create Profile", 
    hasDropdown: true,
    dropdownKey: "createProfile",
    subItems: [
      { label: "Client", path: "/create-profile" },
      { label: "Client Staff", path: "/client-staff-profile" },
      { label: "Zigma Staff", path: "/zigma-staff-profile" },
      { label: "View Users", path: "/view-users" },
    ]
  },
  { 
    icon: UserCheck, 
    label: "Client Details", 
    hasDropdown: true,
    dropdownKey: "clientDetails",
    subItems: [
      { label: "License Details", path: "/client-details?tab=license" },
      { label: "Rent Details", path: "/client-details?tab=rent" },
    ]
  },
  { 
    icon: Users, 
    label: "Client Staff", 
    hasDropdown: true,
    dropdownKey: "clientStaff",
    subItems: [
      { label: "Staff Details", path: "/staff-details" },
      { label: "Staff Salary", path: "/staff-salary" },
      { label: "Staff Document", path: "/staff-document" },
    ]
  },
  {
    icon: Receipt,
    label: "Supplier Customer",
    hasDropdown: true,
    dropdownKey: "supplierCustomer",
    subItems: [
      { label: "Create", path: "/supplier-customer/create" },
      { label: "View", path: "/supplier-customer/view" },
    ]
  },
  { 
    icon: FileText, 
    label: "Invoice", 
    hasDropdown: true,
    dropdownKey: "invoice",
    subItems: [
      { label: "Create Single Invoice", path: "/invoice/create-single" },
      { label: "Create Multiple Invoice", path: "/invoice/create-multiple" },
      { label: "New Multiple Invoice", path: "/invoice/new-multiple" },
      { label: "Pending Invoice", path: "/invoice/pending" },
      { label: "View", path: "/invoice/view" },
      { label: "Invoice Status", path: "/invoice/status" },
      { label: "Invoice Month Wise", path: "/invoice/month-wise" },
    ]
  },
  { icon: CheckSquare, label: "Check Invoice", path: "/check-invoice" },
  { icon: Calendar, label: "Vat Return Date", path: "/vat-return-date" },
  { icon: BarChart3, label: "Vat Return", path: "/vat-return" },
  { icon: Calendar, label: "Vat Return This Month", path: "/vat-return-month" },
  { icon: FileText, label: "Vat Return This Month All", path: "/vat-return-month-all" },
  { icon: Settings, label: "Designation", path: "/designation" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Activity, label: "Staff Activity", path: "/staff-activity" },
]; 