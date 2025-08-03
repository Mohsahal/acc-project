import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Users, 
  ChevronRight,
  Home,
  Edit,
  Eye,
  Trash2,
  Plus,
  Upload,
  Download,
  File
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const StaffDocument = () => {
  const navigate = useNavigate();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const documentData = [
    { 
      id: 1, 
      staffName: "John Doe", 
      documentType: "Passport", 
      fileName: "passport_john_doe.pdf", 
      uploadDate: "2024-01-15",
      status: "Verified",
      fileSize: "2.5 MB"
    },
    { 
      id: 2, 
      staffName: "Jane Smith", 
      documentType: "Visa", 
      fileName: "visa_jane_smith.pdf", 
      uploadDate: "2024-01-20",
      status: "Pending",
      fileSize: "1.8 MB"
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(documentData.map(doc => doc.id.toString()));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleDocumentSelect = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleMultipleDelete = () => {
    console.log("Deleting documents:", selectedDocuments);
  };

  return (
    <DashboardLayout title="AdminPanel">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Staff Document</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <File className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Staff Document</h2>
            </div>
            <Button className="bg-success hover:bg-success/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
              <Input placeholder="Enter staff name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
            {selectedDocuments.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleMultipleDelete}
              >
                Delete Selected ({selectedDocuments.length})
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
                    checked={selectedDocuments.length === documentData.length}
                  />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Staff Name</TableHead>
                <TableHead className="text-blue-600">Document Type</TableHead>
                <TableHead className="text-blue-600">File Name</TableHead>
                <TableHead className="text-blue-600">Upload Date</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead className="text-blue-600">File Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentData.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id.toString())}
                      onChange={() => handleDocumentSelect(doc.id.toString())}
                    />
                  </TableCell>
                  <TableCell>{doc.id}</TableCell>
                  <TableCell>{doc.staffName}</TableCell>
                  <TableCell className="text-blue-600">{doc.documentType}</TableCell>
                  <TableCell className="text-blue-600">{doc.fileName}</TableCell>
                  <TableCell className="text-blue-600">{doc.uploadDate}</TableCell>
                  <TableCell className="text-blue-600">{doc.status}</TableCell>
                  <TableCell className="text-blue-600">{doc.fileSize}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700">
                        <Download className="h-4 w-4" />
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

export default StaffDocument; 