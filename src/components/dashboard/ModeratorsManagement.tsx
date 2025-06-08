
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Plus, Edit, Trash2, Mail, Phone, Shield, Calendar, Eye } from "lucide-react";

interface ModeratorsManagementProps {
  userRole: 'admin' | 'moderator' | 'user';
}

const ModeratorsManagement = ({ userRole }: ModeratorsManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const itemsPerPage = 10;

  // Sample moderator data (15+ items for pagination)
  const moderatorsData = [
    {
      id: 1,
      name: "Alice Moderator",
      email: "alice.mod@company.com",
      phone: "+1 234 567 9000",
      department: "Content",
      status: "Active",
      permissions: ["content", "comments"],
      joinDate: "2023-01-15",
      lastLogin: "2024-01-20 10:30",
      moderatedItems: 145,
      avatar: "AM"
    },
    {
      id: 2,
      name: "Bob Reviewer",
      email: "bob.reviewer@company.com",
      phone: "+1 234 567 9001",
      department: "Support",
      status: "Active",
      permissions: ["support", "tickets"],
      joinDate: "2023-02-20",
      lastLogin: "2024-01-19 15:45",
      moderatedItems: 89,
      avatar: "BR"
    },
    {
      id: 3,
      name: "Carol Handler",
      email: "carol.handler@company.com",
      phone: "+1 234 567 9002",
      department: "Community",
      status: "Inactive",
      permissions: ["community", "forums"],
      joinDate: "2023-03-10",
      lastLogin: "2024-01-10 09:15",
      moderatedItems: 267,
      avatar: "CH"
    },
    {
      id: 4,
      name: "Dan Monitor",
      email: "dan.monitor@company.com",
      phone: "+1 234 567 9003",
      department: "Content",
      status: "Active",
      permissions: ["content", "reviews"],
      joinDate: "2023-04-05",
      lastLogin: "2024-01-20 14:20",
      moderatedItems: 178,
      avatar: "DM"
    },
    {
      id: 5,
      name: "Eve Checker",
      email: "eve.checker@company.com",
      phone: "+1 234 567 9004",
      department: "Quality",
      status: "Active",
      permissions: ["quality", "reports"],
      joinDate: "2023-05-12",
      lastLogin: "2024-01-18 11:30",
      moderatedItems: 92,
      avatar: "EC"
    },
    {
      id: 6,
      name: "Frank Watcher",
      email: "frank.watcher@company.com",
      phone: "+1 234 567 9005",
      department: "Support",
      status: "Active",
      permissions: ["support", "chat"],
      joinDate: "2023-06-18",
      lastLogin: "2024-01-19 16:45",
      moderatedItems: 156,
      avatar: "FW"
    },
    {
      id: 7,
      name: "Grace Keeper",
      email: "grace.keeper@company.com",
      phone: "+1 234 567 9006",
      department: "Community",
      status: "Active",
      permissions: ["community", "events"],
      joinDate: "2023-07-22",
      lastLogin: "2024-01-20 08:15",
      moderatedItems: 203,
      avatar: "GK"
    },
    {
      id: 8,
      name: "Henry Guard",
      email: "henry.guard@company.com",
      phone: "+1 234 567 9007",
      department: "Security",
      status: "Suspended",
      permissions: ["security", "violations"],
      joinDate: "2023-08-14",
      lastLogin: "2024-01-05 13:20",
      moderatedItems: 78,
      avatar: "HG"
    },
    {
      id: 9,
      name: "Ivy Shield",
      email: "ivy.shield@company.com",
      phone: "+1 234 567 9008",
      department: "Content",
      status: "Active",
      permissions: ["content", "spam"],
      joinDate: "2023-09-08",
      lastLogin: "2024-01-19 12:10",
      moderatedItems: 134,
      avatar: "IS"
    },
    {
      id: 10,
      name: "Jack Patrol",
      email: "jack.patrol@company.com",
      phone: "+1 234 567 9009",
      department: "Quality",
      status: "Active",
      permissions: ["quality", "feedback"],
      joinDate: "2023-10-03",
      lastLogin: "2024-01-20 17:30",
      moderatedItems: 189,
      avatar: "JP"
    },
    {
      id: 11,
      name: "Kate Overseer",
      email: "kate.overseer@company.com",
      phone: "+1 234 567 9010",
      department: "Support",
      status: "Active",
      permissions: ["support", "escalation"],
      joinDate: "2023-11-15",
      lastLogin: "2024-01-18 10:45",
      moderatedItems: 67,
      avatar: "KO"
    },
    {
      id: 12,
      name: "Leo Sentinel",
      email: "leo.sentinel@company.com",
      phone: "+1 234 567 9011",
      department: "Security",
      status: "Inactive",
      permissions: ["security"],
      joinDate: "2023-12-01",
      lastLogin: "2024-01-12 14:15",
      moderatedItems: 45,
      avatar: "LS"
    }
  ];

  // Filter and search logic
  const filteredModerators = moderatorsData.filter(moderator => {
    const matchesSearch = 
      moderator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moderator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moderator.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || moderator.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesDepartment = filterDepartment === "all" || moderator.department.toLowerCase() === filterDepartment.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredModerators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedModerators = filteredModerators.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "suspended": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department.toLowerCase()) {
      case "content": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "support": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "community": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "quality": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "security": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  // Show limited data for moderators
  const canViewSensitiveData = userRole === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Moderators Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage moderator accounts and their permissions.
            {!canViewSensitiveData && (
              <span className="block text-sm text-orange-600 dark:text-orange-400 mt-1">
                Limited view - Contact admin for full access
              </span>
            )}
          </p>
        </div>
        {canViewSensitiveData && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Moderator
          </Button>
        )}
      </div>

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <CardTitle className="dark:text-white">All Moderators ({filteredModerators.length})</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search moderators..."
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
                
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-36 dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800">
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="quality">Quality</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Moderator</th>
                  {canViewSensitiveData && (
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Contact</th>
                  )}
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Moderated Items</th>
                  {canViewSensitiveData && (
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Last Login</th>
                  )}
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedModerators.map((moderator) => (
                  <tr key={moderator.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {moderator.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{moderator.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ID: {moderator.id}</p>
                        </div>
                      </div>
                    </td>
                    {canViewSensitiveData && (
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-900 dark:text-white">{moderator.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-900 dark:text-white">{moderator.phone}</span>
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="py-4 px-4">
                      <Badge className={getDepartmentColor(moderator.department)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {moderator.department}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(moderator.status)}>{moderator.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">{moderator.moderatedItems}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">items</p>
                      </div>
                    </td>
                    {canViewSensitiveData && (
                      <td className="py-4 px-4 text-gray-900 dark:text-white text-sm">{moderator.lastLogin}</td>
                    )}
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          <Eye className="h-3 w-3" />
                        </Button>
                        {canViewSensitiveData && (
                          <>
                            <Button variant="outline" size="sm" className="hover:bg-blue-50">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
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

export default ModeratorsManagement;
