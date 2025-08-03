import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const PendingInvoice = () => {
  const navigate = useNavigate();
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    client: ""
  });

  const pendingInvoiceData = [
    { 
      id: 1, 
      invoiceNumber: "INV-001", 
      clientName: "Tech Solutions", 
      amount: "5000.00", 
      dueDate: "2024-02-15",
      status: "Pending",
      createdDate: "2024-01-15"
    },
    { 
      id: 2, 
      invoiceNumber: "INV-002", 
      clientName: "Digital Systems", 
      amount: "3500.00", 
      dueDate: "2024-02-20",
      status: "Pending",
      createdDate: "2024-01-18"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting pending invoice request...", formData);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(pendingInvoiceData.map(invoice => invoice.id.toString()));
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

  const handleMultipleApprove = () => {
    console.log("Approving invoices:", selectedInvoices);
  };

  return (
    <DashboardLayout title="AdminPanel">
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Home className="h-4 w-4" />
          <span>Home</span>
              <ChevronRight className="h-4 w-4" />
              <span>Pending Invoice</span>
            </div>
          </div>

      <Card>
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Pending Invoice
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
                  </div>
                  
          <div className="flex space-x-4 mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
              Search
            </Button>
            <Button variant="outline">
              Reset
            </Button>
            {selectedInvoices.length > 0 && (
                    <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleMultipleApprove}
                    >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Selected ({selectedInvoices.length})
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
                    checked={selectedInvoices.length === pendingInvoiceData.length}
                  />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead className="text-blue-600">Client Name</TableHead>
                <TableHead className="text-blue-600">Amount</TableHead>
                <TableHead className="text-blue-600">Due Date</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead className="text-blue-600">Created Date</TableHead>
                <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
              {pendingInvoiceData.map((invoice) => (
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
                  <TableCell className="text-blue-600">{invoice.dueDate}</TableCell>
                  <TableCell className="text-blue-600">{invoice.status}</TableCell>
                  <TableCell className="text-blue-600">{invoice.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700">
                        <CheckCircle className="h-4 w-4" />
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

export default PendingInvoice; 