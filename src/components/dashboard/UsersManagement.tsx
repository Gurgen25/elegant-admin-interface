
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Plus, Edit, Trash2, Mail, Phone } from "lucide-react";

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const itemsPerPage = 10;

  // Extended sample data (20+ items for pagination)
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      role: "Admin",
      status: "Active",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-20 10:30",
      totalOrders: 12,
      avatar: "JD"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      role: "User",
      status: "Active",
      joinDate: "2023-02-20",
      lastLogin: "2024-01-19 15:45",
      totalOrders: 8,
      avatar: "JS"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
      role: "Moderator",
      status: "Inactive",
      joinDate: "2023-03-10",
      lastLogin: "2024-01-10 09:15",
      totalOrders: 0,
      avatar: "MJ"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 234 567 8903",
      role: "User",
      status: "Active",
      joinDate: "2023-04-05",
      lastLogin: "2024-01-18 14:20",
      totalOrders: 25,
      avatar: "SW"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      phone: "+1 234 567 8904",
      role: "User",
      status: "Suspended",
      joinDate: "2023-05-12",
      lastLogin: "2024-01-05 11:30",
      totalOrders: 3,
      avatar: "DB"
    },
    {
      id: 6,
      name: "Lisa Garcia",
      email: "lisa@example.com",
      phone: "+1 234 567 8905",
      role: "User",
      status: "Active",
      joinDate: "2023-06-18",
      lastLogin: "2024-01-19 16:45",
      totalOrders: 15,
      avatar: "LG"
    },
    {
      id: 7,
      name: "Tom Anderson",
      email: "tom@example.com",
      phone: "+1 234 567 8906",
      role: "Moderator",
      status: "Active",
      joinDate: "2023-07-22",
      lastLogin: "2024-01-20 08:15",
      totalOrders: 7,
      avatar: "TA"
    },
    {
      id: 8,
      name: "Amy Chen",
      email: "amy@example.com",
      phone: "+1 234 567 8907",
      role: "User",
      status: "Active",
      joinDate: "2023-08-14",
      lastLogin: "2024-01-17 13:20",
      totalOrders: 19,
      avatar: "AC"
    },
    {
      id: 9,
      name: "Robert Lee",
      email: "robert@example.com",
      phone: "+1 234 567 8908",
      role: "User",
      status: "Active",
      joinDate: "2023-09-08",
      lastLogin: "2024-01-16 12:10",
      totalOrders: 6,
      avatar: "RL"
    },
    {
      id: 10,
      name: "Maria Rodriguez",
      email: "maria@example.com",
      phone: "+1 234 567 8909",
      role: "User",
      status: "Active",
      joinDate: "2023-10-03",
      lastLogin: "2024-01-20 17:30",
      totalOrders: 31,
      avatar: "MR"
    },
    {
      id: 11,
      name: "James Taylor",
      email: "james@example.com",
      phone: "+1 234 567 8910",
      role: "User",
      status: "Inactive",
      joinDate: "2023-11-15",
      lastLogin: "2024-01-01 10:45",
      totalOrders: 2,
      avatar: "JT"
    },
    {
      id: 12,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1 234 567 8911",
      role: "User",
      status: "Active",
      joinDate: "2023-12-01",
      lastLogin: "2024-01-19 14:15",
      totalOrders: 11,
      avatar: "ED"
    },
    {
      id: 13,
      name: "Alex Turner",
      email: "alex@example.com",
      phone: "+1 234 567 8912",
      role: "User",
      status: "Active",
      joinDate: "2024-01-02",
      lastLogin: "2024-01-20 09:30",
      totalOrders: 4,
      avatar: "AT"
    },
    {
      id: 14,
      name: "Sophie Miller",
      email: "sophie@example.com",
      phone: "+1 234 567 8913",
      role: "User",
      status: "Active",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-18 16:20",
      totalOrders: 7,
      avatar: "SM"
    },
    {
      id: 15,
      name: "Ryan White",
      email: "ryan@example.com",
      phone: "+1 234 567 8914",
      role: "Moderator",
      status: "Active",
      joinDate: "2024-01-08",
      lastLogin: "2024-01-20 11:45",
      totalOrders: 0,
      avatar: "RW"
    },
    {
      id: 16,
      name: "Grace Thompson",
      email: "grace@example.com",
      phone: "+1 234 567 8915",
      role: "User",
      status: "Active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-19 13:15",
      totalOrders: 9,
      avatar: "GT"
    },
    {
      id: 17,
      name: "Oliver Harris",
      email: "oliver@example.com",
      phone: "+1 234 567 8916",
      role: "User",
      status: "Suspended",
      joinDate: "2024-01-12",
      lastLogin: "2024-01-15 10:20",
      totalOrders: 1,
      avatar: "OH"
    },
    {
      id: 18,
      name: "Zoe Clark",
      email: "zoe@example.com",
      phone: "+1 234 567 8917",
      role: "User",
      status: "Active",
      joinDate: "2024-01-14",
      lastLogin: "2024-01-20 15:30",
      totalOrders: 5,
      avatar: "ZC"
    }
  ];

  // Filter and search logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase();
    const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Moderator": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "Suspended": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and monitor your application users.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <CardTitle className="dark:text-white">All Users ({filteredUsers.length})</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              
              {/* Filters */}
              <div className="flex gap-2">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-32 dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                
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
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid gap-4 md:hidden">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="p-4 border dark:border-gray-700 rounded-lg space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Orders: {user.totalOrders}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <table className="w-full hidden md:table">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Last Login</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">{user.totalOrders}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white text-sm">{user.lastLogin}</td>
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

export default UsersManagement;
