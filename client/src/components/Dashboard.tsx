import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  DollarSign, 
  FileText, 
  ChevronRight
} from "lucide-react";
import { apiService } from "@/services/api";
import DashboardLayout from "./DashboardLayout";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalStaff: 0,
    totalAmount: 0,
    completedInvoices: 0,
    pendingInvoices: 0,
    partiallyCompletedInvoices: 0
  });

  const [vatReturns, setVatReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch clients
        const clientsResponse = await apiService.getClients({ limit: 1 });
        
        // Fetch invoices
        const invoicesResponse = await apiService.getInvoices({ limit: 1 });
        
        // Calculate stats
        const completedInvoices = invoicesResponse.data.filter(inv => inv.status === 'completed').length;
        const pendingInvoices = invoicesResponse.data.filter(inv => inv.status === 'pending').length;
        const partiallyCompletedInvoices = invoicesResponse.data.filter(inv => inv.status === 'partially_completed').length;
        
        setStats({
          totalClients: clientsResponse.pagination?.totalItems || 0,
          totalStaff: 16, // Mock data for now
          totalAmount: 728245898.50, // Mock data for now
          completedInvoices,
          pendingInvoices,
          partiallyCompletedInvoices
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Dashboard <span className="text-gray-500 font-normal">Control panel</span>
        </h2>
      </div>

      {/* Stats Cards Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-stats-bg border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">TOTAL CLIENT</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalClients}</p>
              </div>
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stats-bg border-l-4 border-l-cyan-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">TOTAL STAFF</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalStaff}</p>
              </div>
              <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stats-bg border-l-4 border-l-pink-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">TOTAL AMOUNT</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">There were 494394 files</p>
              </div>
              <div className="w-16 h-16 bg-pink-500 rounded-lg flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-success text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-6xl font-bold">{stats.completedInvoices}</p>
                <p className="text-lg font-medium">Completed Invoice</p>
              </div>
              <FileText className="h-16 w-16 opacity-20" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span>More info</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-6xl font-bold">{stats.partiallyCompletedInvoices}</p>
                <p className="text-lg font-medium">Partially Completed Invoice</p>
              </div>
              <FileText className="h-16 w-16 opacity-20" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span>More info</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-pending text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-6xl font-bold">{stats.pendingInvoices}</p>
                <p className="text-lg font-medium">Pending Invoice</p>
              </div>
              <FileText className="h-16 w-16 opacity-20" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span>More info</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VAT Return Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Vat Return</h3>
            <button className="text-gray-400 hover:text-gray-600">×</button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Vat Return</TableHead>
                <TableHead>Trn Number</TableHead>
                <TableHead>Last Vat Return</TableHead>
                <TableHead>Next Vat Return</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;