import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronRight,
  Home,
  FileText,
  Upload,
  Edit3
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const NewMultipleInvoice = () => {
  const [formData, setFormData] = useState({
    client: "",
    sales: "Sales"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBrowse = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      console.log("Selected files:", files);
    };
    input.click();
  };

  const handleUpload = () => {
    console.log("Uploading files...", formData);
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>New Multiple Invoice</span>
        </div>
      </div>

      {/* Main White Card */}
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="flex items-center justify-between text-gray-800">
              <div className="flex items-center space-x-2">
                <Edit3 className="h-5 w-5 text-blue-600" />
                <span>Multiple Invoice</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Input Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Client</Label>
                  <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
                    <SelectTrigger className="w-full h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select Client ..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLICK COMPUTERS">CLICK COMPUTERS</SelectItem>
                      <SelectItem value="TECH SOLUTIONS">TECH SOLUTIONS</SelectItem>
                      <SelectItem value="DIGITAL SYSTEMS">DIGITAL SYSTEMS</SelectItem>
                      <SelectItem value="SOFTWARE CORP">SOFTWARE CORP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Sales</Label>
                  <Select value={formData.sales} onValueChange={(value) => handleInputChange("sales", value)}>
                    <SelectTrigger className="w-full h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Purchase">Purchase</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleBrowse}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 h-10 text-sm font-medium"
                >
                  Browse...
                </Button>
                <Button 
                  onClick={handleUpload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 h-10 text-sm font-medium"
                >
                  Upload
                </Button>
              </div>

              {/* Empty Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-white">
                <div className="text-gray-400 mb-4">
                  <FileText className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500 text-base">
                  Drag & drop files here or click to browse
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Copyright © 2013-2025 <span className="text-blue-600">Zeigets.</span> All rights reserved. v2.170322
        <span className="float-right">Version 2.2</span>
      </div>
    </DashboardLayout>
  );
};

export default NewMultipleInvoice; 