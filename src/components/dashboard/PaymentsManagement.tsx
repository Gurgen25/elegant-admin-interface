
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, TrendingUp, RefreshCw } from "lucide-react";

interface Payment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: 'credit_card' | 'paypal' | 'stripe' | 'bank_transfer';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  transactionId: string;
}

const PaymentsManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([
    { id: "PAY-001", orderId: "ORD-001", customer: "John Doe", amount: 299.97, method: "stripe", status: "completed", date: "2024-01-15", transactionId: "txn_1234567890" },
    { id: "PAY-002", orderId: "ORD-002", customer: "Jane Smith", amount: 199.99, method: "credit_card", status: "completed", date: "2024-01-14", transactionId: "txn_0987654321" },
    { id: "PAY-003", orderId: "ORD-003", customer: "Bob Johnson", amount: 115.98, method: "paypal", status: "pending", date: "2024-01-13", transactionId: "txn_1122334455" },
    { id: "PAY-004", orderId: "ORD-004", customer: "Alice Brown", amount: 99.99, method: "stripe", status: "completed", date: "2024-01-12", transactionId: "txn_5566778899" },
    { id: "PAY-005", orderId: "ORD-005", customer: "Charlie Wilson", amount: 49.99, method: "credit_card", status: "failed", date: "2024-01-11", transactionId: "txn_9988776655" },
  ]);

  const updatePaymentStatus = (paymentId: string, newStatus: Payment['status']) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: newStatus } : payment
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'stripe': return 'bg-purple-100 text-purple-800';
      case 'paypal': return 'bg-blue-100 text-blue-800';
      case 'credit_card': return 'bg-green-100 text-green-800';
      case 'bank_transfer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
        <Button className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Sync Payments</span>
        </Button>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{failedPayments}</p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['stripe', 'credit_card', 'paypal', 'bank_transfer'].map((method) => {
              const methodPayments = payments.filter(p => p.method === method && p.status === 'completed');
              const methodRevenue = methodPayments.reduce((sum, payment) => sum + payment.amount, 0);
              return (
                <div key={method} className="text-center p-4 border rounded-lg">
                  <p className="text-sm font-medium text-gray-600 capitalize">{method.replace('_', ' ')}</p>
                  <p className="text-xl font-bold text-gray-900">{methodPayments.length} payments</p>
                  <p className="text-sm text-green-600">${methodRevenue.toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.orderId}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell className="font-semibold">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getMethodColor(payment.method)}>
                      {payment.method.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="text-xs font-mono">{payment.transactionId}</TableCell>
                  <TableCell>
                    <select 
                      value={payment.status}
                      onChange={(e) => updatePaymentStatus(payment.id, e.target.value as Payment['status'])}
                      className="text-xs border rounded px-2 py-1"
                      disabled={payment.status === 'completed'}
                    >
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsManagement;
