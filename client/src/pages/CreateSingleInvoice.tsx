import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  ChevronRight,
  Home,
  FileText,
  Upload,
  X,
  CalendarIcon,
  Plus,
  Save
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const CreateSingleInvoice = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    customer: "CLICK COMPUTERS",
    invoiceDate: "2019-12-09",
    invoiceNumber: "",
    amount: "",
    vat: "",
    totalAmount: "",
    purchase: ""
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saving invoice...", formData);
  };

  const handleCreate = () => {
    // Handle create logic
    console.log("Creating invoice...", formData);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Create Single Invoice</span>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Create Single Invoice
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Customer</Label>
              <Select value={formData.customer} onValueChange={(value) => handleInputChange("customer", value)}>
                <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLICK COMPUTERS">CLICK COMPUTERS</SelectItem>
                  <SelectItem value="TECH SOLUTIONS">TECH SOLUTIONS</SelectItem>
                  <SelectItem value="DIGITAL SYSTEMS">DIGITAL SYSTEMS</SelectItem>
                  <SelectItem value="SOFTWARE CORP">SOFTWARE CORP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Invoice Date */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Invoice Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
                  className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Invoice Number */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Invoice Number</Label>
              <Input
                value={formData.invoiceNumber}
                onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                placeholder="Enter invoice number"
                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Amount */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Amount</Label>
              <Input
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="Enter amount"
                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* VAT */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">VAT</Label>
              <Input
                value={formData.vat}
                onChange={(e) => handleInputChange("vat", e.target.value)}
                placeholder="Enter VAT amount"
                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Total Amount */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Total Amount</Label>
              <Input
                value={formData.totalAmount}
                onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                placeholder="Enter total amount"
                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Purchase */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Purchase</Label>
              <Input
                value={formData.purchase}
                onChange={(e) => handleInputChange("purchase", e.target.value)}
                placeholder="Enter purchase details"
                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mt-6">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Upload Files</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop files here, or click to select files
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Select Files
              </label>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button 
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
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

export default CreateSingleInvoice; 