import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronRight,
  Upload,
  X,
  Plus,
  Copy,
  Trash2,
  Edit3,
  FolderOpen
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/DashboardLayout";

const CreateMultipleInvoice = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    sales: "Sales/Purchase"
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

  const handleBrowse = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      setSelectedFiles(prev => [...prev, ...files]);
    };
    input.click();
  };

  const handleCreate = () => {
    console.log("Creating multiple invoices...", { formData, selectedFiles });
  };

  return (
    <DashboardLayout title="Multiple Invoice" showUserMenu={false}>
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span>Multiple Invoice</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section: Upload Invoice */}
        <div>
          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Upload Invoice
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Drag & Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
                    isDragOver 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleBrowse}
                >
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drag & drop files here...
                  </p>
                  <p className="text-sm text-gray-500">
                    or click to browse files
                  </p>
                </div>

                {/* Select Files Button */}
                <div className="flex justify-start">
                  <Button 
                    onClick={handleBrowse}
                    variant="outline"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                  >
                    Select files...
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  <Button variant="outline" className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300">
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Select Client */}
        <div>
          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Select Client
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Client Dropdown */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Client</Label>
                  <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
                    <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLICK COMPUTERS">CLICK COMPUTERS</SelectItem>
                      <SelectItem value="TECH SOLUTIONS">TECH SOLUTIONS</SelectItem>
                      <SelectItem value="DIGITAL SYSTEMS">DIGITAL SYSTEMS</SelectItem>
                      <SelectItem value="SOFTWARE CORP">SOFTWARE CORP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sales/Purchase Dropdown */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Sales/Purchase</Label>
                  <Select value={formData.sales} onValueChange={(value) => handleInputChange("sales", value)}>
                    <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Purchase">Purchase</SelectItem>
                      <SelectItem value="Sales/Purchase">Sales/Purchase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Create Button */}
                <div className="pt-4">
                  <Button 
                    onClick={handleCreate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-medium"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateMultipleInvoice; 