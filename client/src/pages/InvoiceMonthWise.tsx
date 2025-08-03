import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronRight,
  X,
  Edit3,
  RotateCcw
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const InvoiceMonthWise = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client: "",
    month: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting invoice month wise request...", formData);
  };

  const handleReset = () => {
    setFormData({ client: "", month: "" });
  };

  return (
    <DashboardLayout title="Invoice Status" showUserMenu={false}>
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span>Invoice Month Wise</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main White Card */}
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <Edit3 className="h-5 w-5 text-blue-600" />
              <span>Invoice Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Form Section */}
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Client</Label>
                  <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
                    <SelectTrigger className="w-full h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLICK COMPUTER LLC">CLICK COMPUTER LLC</SelectItem>
                      <SelectItem value="TECH SOLUTIONS">TECH SOLUTIONS</SelectItem>
                      <SelectItem value="DIGITAL SYSTEMS">DIGITAL SYSTEMS</SelectItem>
                      <SelectItem value="SOFTWARE CORP">SOFTWARE CORP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Month</Label>
                  <Select value={formData.month} onValueChange={(value) => handleInputChange("month", value)}>
                    <SelectTrigger className="w-full h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Loading..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="february">February</SelectItem>
                      <SelectItem value="march">March</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="may">May</SelectItem>
                      <SelectItem value="june">June</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="august">August</SelectItem>
                      <SelectItem value="september">September</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                      <SelectItem value="november">November</SelectItem>
                      <SelectItem value="december">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 h-10 text-sm font-medium"
                  >
                    Submit
                  </Button>
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 px-6 py-2 h-10 text-sm font-medium"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Empty Content Area */}
              <div className="min-h-96 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <span className="h-12 w-12 mx-auto mb-4 text-gray-400">📄</span>
                  <p className="text-lg font-medium">No data available</p>
                  <p className="text-sm">Select a client and month to view invoice data</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InvoiceMonthWise; 