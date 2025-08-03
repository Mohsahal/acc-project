import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ChevronRight,
  Home,
  FileText,
  Edit,
  Trash2
} from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const ClientDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("license");

  // Initialize tab from URL parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "rent" || tabParam === "license") {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const licenseData = [
    { 
      id: 1, 
      clientName: "Zeigets", 
      amount: "1000.00", 
      startDate: "2023-12-29", 
      endDate: "2023-12-14", 
      type: "L" 
    }
  ];

  const rentData = [
    { 
      id: 1, 
      clientName: "Zeigets", 
      amount: "2000.00", 
      date: "2023-12-12"
    }
  ];

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Client Details</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => handleTabChange("license")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "license"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            License Details
          </button>
          <button
            onClick={() => handleTabChange("rent")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "rent"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Rent Details
          </button>
        </div>
      </div>

      {/* License Details Section */}
      {activeTab === "license" && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">License Details</h2>
            </div>
            
            <div className="mb-6">
              <Button className="bg-success hover:bg-success/90 text-white">
                Create License
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zeigets">Zeigets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
              <Button variant="outline">
                Reset
              </Button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Showing 1-1 of 1 item.</p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead className="text-blue-600">Amount</TableHead>
                  <TableHead className="text-blue-600">Start Date</TableHead>
                  <TableHead className="text-blue-600">End Date</TableHead>
                  <TableHead className="text-blue-600">Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenseData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.clientName}</TableCell>
                    <TableCell className="text-blue-600">{item.amount}</TableCell>
                    <TableCell className="text-blue-600">{item.startDate}</TableCell>
                    <TableCell className="text-blue-600">{item.endDate}</TableCell>
                    <TableCell className="text-blue-600">{item.type}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
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
      )}

      {/* Rent Details Section */}
      {activeTab === "rent" && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Rent Details</h2>
            </div>
            
            <div className="mb-6">
              <Button className="bg-success hover:bg-success/90 text-white">
                Create Rent
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zeigets">Zeigets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
              <Button variant="outline">
                Reset
              </Button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Showing 1-1 of 1 item.</p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead className="text-blue-600">Amount</TableHead>
                  <TableHead className="text-blue-600">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.clientName}</TableCell>
                    <TableCell className="text-blue-600">{item.amount}</TableCell>
                    <TableCell className="text-blue-600">{item.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
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
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Copyright © 2013-2025 <span className="text-blue-600">Zeigets.</span> All rights reserved. v2.170322
        <span className="float-right">Version 2.2</span>
      </div>
    </DashboardLayout>
  );
};

export default ClientDetails;

