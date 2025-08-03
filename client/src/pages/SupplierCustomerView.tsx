import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Search,
  RotateCcw,
  Eye,
  UserCheck as UserCheckIcon,
  X,
  Plus
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";

const SupplierCustomerView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const supplierCustomerData = [
    {
      id: 1,
      name: "Tech Solutions Ltd",
      email: "info@techsolutions.com",
      phone: "+971 50 123 4567",
      type: "Supplier",
      status: "Active",
      company: "Tech Solutions Ltd",
      contactPerson: "John Smith",
      address: "Dubai, UAE"
    },
    {
      id: 2,
      name: "Digital Systems",
      email: "contact@digitalsystems.com",
      phone: "+971 55 987 6543",
      type: "Customer",
      status: "Active",
      company: "Digital Systems",
      contactPerson: "Jane Doe",
      address: "Abu Dhabi, UAE"
    }
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleReset = () => {
    setSearchQuery("");
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(supplierCustomerData.map(item => item.id.toString()));
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleMultipleDelete = () => {
    console.log("Deleting items:", selectedItems);
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Supplier Customer View</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Supplier/Customer List</h2>
            </div>
            <Button className="bg-success hover:bg-success/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>

          {/* Search Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                placeholder="Search by name, email, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select className="w-full h-10 border border-gray-300 rounded-md px-3 focus:border-blue-500 focus:ring-blue-500">
                <option value="">All Types</option>
                <option value="supplier">Supplier</option>
                <option value="customer">Customer</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="w-full h-10 border border-gray-300 rounded-md px-3 focus:border-blue-500 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            {selectedItems.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleMultipleDelete}
              >
                Delete Selected ({selectedItems.length})
              </Button>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Showing 1-2 of 2 items.</p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedItems.length === supplierCustomerData.length}
                  />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-blue-600">Email</TableHead>
                <TableHead className="text-blue-600">Phone</TableHead>
                <TableHead className="text-blue-600">Type</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead className="text-blue-600">Company</TableHead>
                <TableHead className="text-blue-600">Contact Person</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierCustomerData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id.toString())}
                      onChange={() => handleItemSelect(item.id.toString())}
                    />
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-blue-600">{item.email}</TableCell>
                  <TableCell className="text-blue-600">{item.phone}</TableCell>
                  <TableCell className="text-blue-600">{item.type}</TableCell>
                  <TableCell className="text-blue-600">{item.status}</TableCell>
                  <TableCell className="text-blue-600">{item.company}</TableCell>
                  <TableCell className="text-blue-600">{item.contactPerson}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

export default SupplierCustomerView; 