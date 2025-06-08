
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Plus, Edit, Trash2, Mail, Phone, Shield, Calendar } from "lucide-react";

const AdminsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const itemsPerPage = 10;

  // Sample admin data (15+ items for pagination)
  const adminsData = [
    {
      id: 1,
      name: "John Admin",
      email: "john.admin@company.com",
      phone: "+1 234 567 8900",
      role: "Super Admin",
      status: "Active",
      permissions: ["all"],
      joinDate: "2023-01-15",
      lastLogin: "2024-01-20 10:30",
      avatar: "JA"
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah.manager@company.com",
      phone: "+1 234 567 8901",
      role: "Admin",
      status: "Active",
      permissions: ["users", "products", "orders"],
      joinDate: "2023-02-20",
      lastLogin: "2024-01-19 15:45",
      avatar: "SM"
    },
    {
      id: 3,
      name: "Mike Controller",
      email: "mike.controller@company.com",
      phone: "+1 234 567 8902",
      role: "Admin",
      status: "Inactive",
      permissions: ["analytics", "reports"],
      joinDate: "2023-03-10",
      lastLogin: "2024-01-10 09:15",
      avatar: "MC"
    },
    {
      id: 4,
      name: "Emma Director",
      email: "emma.director@company.com",
      phone: "+1 234 567 8903",
      role: "Super Admin",
      status: "Active",
      permissions: ["all"],
      joinDate: "2023-04-05",
      lastLogin: "2024-01-20 14:20",
      avatar: "ED"
    },
    {
      id: 5,
      name: "David Supervisor",
      email: "david.supervisor@company.com",
      phone: "+1 234 567 8904",
      role: "Admin",
      status: "Active",
      permissions: ["customers", "support"],
      joinDate: "2023-05-12",
      lastLogin: "2024-01-18 11:30",
      avatar: "DS"
    },
    {
      id: 6,
      name: "Lisa Head",
      email: "lisa.head@company.com",
      phone: "+1 234 567 8905",
      role: "Admin",
      status: "Active",
      permissions: ["products", "inventory"],
      joinDate: "2023-06-18",
      lastLogin: "2024-01-19 16:45",
      avatar: "LH"
    },
    {
      id: 7,
      name: "Tom Chief",
      email: "tom.chief@company.com",
      phone: "+1 234 567 8906",
      role: "Super Admin",
      status: "Active",
      permissions: ["all"],
      joinDate: "2023-07-22",
      lastLogin: "2024-01-20 08:15",
      avatar: "TC"
    },
    {
      id: 8,
      name: "Amy Leader",
      email: "amy.leader@company.com",
      phone: "+1 234 567 8907",
      role: "Admin",
      status: "Suspended",
      permissions: ["orders", "payments"],
      joinDate: "2023-08-14",
      lastLogin: "2024-01-05 13:20",
      avatar: "AL"
    },
    {
      id: 9,
      name: "Robert Boss",
      email: "robert.boss@company.com",
      phone: "+1 234 567 8908",
      role: "Admin",
      status: "Active",
      permissions: ["analytics", "users"],
      joinDate: "2023-09-08",
      lastLogin: "2024-01-19 12:10",
      avatar: "RB"
    },
    {
      id: 10,
      name: "Maria Executive",
      email: "maria.executive@company.com",
      phone: "+1 234 567 8909",
      role: "Super Admin",
      status: "Active",
      permissions: ["all"],
      joinDate: "2023-10-03",
      lastLogin: "2024-01-20 17:30",
      avatar: "ME"
    },
    {
      id: 11,
      name: "James Principal",
      email: "james.principal@company.com",
      phone: "+1 234 567 8910",
      role: "Admin",
      status: "Active",
      permissions: ["support", "feedback"],
      joinDate: "2023-11-15",
      lastLogin: "2024-01-18 10:45",
      avatar: "JP"
    },
    {
      id: 12,
      name: "Emma Senior",
      email: "emma.senior@company.com",
      phone: "+1 234 567 8911",
      role: "Admin",
      status: "Inactive",
      permissions: ["customers"],
      joinDate: "2023-12-01",
      lastLogin: "2024-01-12 14:15",
      avatar: "ES"
    }
  ];

  // Filter and search logic
  const filteredAdmins = adminsData.filter(admin => {
    const matchesSearch = 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || admin.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesRole = filterRole === "all" || admin.role.toLowerCase() === filterRole.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAdmins = filteredAdmins.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "suspended": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getRoleColor = (role: string) => {
    return role === "Super Admin" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admins Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage administrator accounts and permissions.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Admin
        </Button>
      </div>

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <CardTitle className="dark:text-white">All Admins ({filteredAdmins.length})</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              
              {/* Filters */}
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-36 dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="super admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Admin</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Last Login</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Join Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAdmins.map((admin) => (
                  <tr key={admin.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {admin.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{admin.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ID: {admin.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{admin.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{admin.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getRoleColor(admin.role)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {admin.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(admin.status)}>{admin.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white text-sm">{admin.lastLogin}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>{admin.joinDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminsManagement;
