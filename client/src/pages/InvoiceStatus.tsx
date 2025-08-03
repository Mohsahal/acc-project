import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  ChevronRight,
  Home,
  FileText,
  X,
  Edit3,
  Eye,
  CheckCircle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const InvoiceStatus = () => {
  const navigate = useNavigate();
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    client: "",
    status: "Loading..."
  });

  const invoiceStatusData = [
    { 
      id: 1, 
      invoiceNumber: "INV-001", 
      clientName: "Tech Solutions", 
      amount: "5000.00", 
      status: "Completed",
      completionDate: "2024-01-15",
      createdDate: "2024-01-10"
    },
    { 
      id: 2, 
      invoiceNumber: "INV-002", 
      clientName: "Digital Systems", 
      amount: "3500.00", 
      status: "Pending",
      completionDate: "-",
      createdDate: "2024-01-12"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting invoice status request...", formData);
  };

  const handleReset = () => {
    setFormData({
      client: "",
      status: "Loading..."
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(invoiceStatusData.map(invoice => invoice.id.toString()));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleInvoiceSelect = (invoiceId: string) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Invoice Status</span>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Invoice Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Client</Label>
              <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
                <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech-solutions">Tech Solutions</SelectItem>
                  <SelectItem value="digital-systems">Digital Systems</SelectItem>
                  <SelectItem value="software-corp">Software Corp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
              Search
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Showing 1-2 of 2 items.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Completed</p>
                    <p className="text-2xl font-bold text-green-900">1</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Pending</p>
                    <p className="text-2xl font-bold text-yellow-900">1</p>
                  </div>
                  <FileText className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Total</p>
                    <p className="text-2xl font-bold text-blue-900">2</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedInvoices.length === invoiceStatusData.length}
                  />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead className="text-blue-600">Client Name</TableHead>
                <TableHead className="text-blue-600">Amount</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead className="text-blue-600">Completion Date</TableHead>
                <TableHead className="text-blue-600">Created Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceStatusData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id.toString())}
                      onChange={() => handleInvoiceSelect(invoice.id.toString())}
                    />
                  </TableCell>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell className="text-blue-600">{invoice.clientName}</TableCell>
                  <TableCell className="text-blue-600">{invoice.amount}</TableCell>
                  <TableCell className="text-blue-600">{invoice.status}</TableCell>
                  <TableCell className="text-blue-600">{invoice.completionDate}</TableCell>
                  <TableCell className="text-blue-600">{invoice.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        <X className="h-4 w-4" />
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

export default InvoiceStatus; 