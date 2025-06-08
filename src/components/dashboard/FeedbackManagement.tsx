
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Star, Eye, Trash2, Filter } from "lucide-react";

const FeedbackManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const itemsPerPage = 10;

  // Sample feedback data (15+ items for pagination)
  const feedbackData = [
    {
      id: 1,
      customerName: "John Doe",
      email: "john@example.com",
      product: "Wireless Headphones",
      rating: 5,
      comment: "Excellent product! Great sound quality and comfortable to wear.",
      status: "published",
      date: "2024-01-15",
      helpful: 12
    },
    {
      id: 2,
      customerName: "Jane Smith",
      email: "jane@example.com",
      product: "Smart Watch",
      rating: 4,
      comment: "Good watch but battery life could be better.",
      status: "pending",
      date: "2024-01-14",
      helpful: 8
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      email: "mike@example.com",
      product: "Laptop Stand",
      rating: 3,
      comment: "Average quality, does the job but nothing special.",
      status: "published",
      date: "2024-01-13",
      helpful: 3
    },
    {
      id: 4,
      customerName: "Sarah Wilson",
      email: "sarah@example.com",
      product: "Bluetooth Speaker",
      rating: 5,
      comment: "Amazing sound quality! Highly recommended.",
      status: "published",
      date: "2024-01-12",
      helpful: 15
    },
    {
      id: 5,
      customerName: "David Brown",
      email: "david@example.com",
      product: "Phone Case",
      rating: 2,
      comment: "Not as protective as advertised. Disappointed.",
      status: "flagged",
      date: "2024-01-11",
      helpful: 1
    },
    {
      id: 6,
      customerName: "Lisa Garcia",
      email: "lisa@example.com",
      product: "Wireless Mouse",
      rating: 4,
      comment: "Smooth tracking and comfortable grip.",
      status: "published",
      date: "2024-01-10",
      helpful: 7
    },
    {
      id: 7,
      customerName: "Tom Anderson",
      email: "tom@example.com",
      product: "Keyboard",
      rating: 5,
      comment: "Perfect for gaming and typing. Love the RGB lighting!",
      status: "pending",
      date: "2024-01-09",
      helpful: 9
    },
    {
      id: 8,
      customerName: "Amy Chen",
      email: "amy@example.com",
      product: "Monitor",
      rating: 4,
      comment: "Great display quality but setup was a bit complex.",
      status: "published",
      date: "2024-01-08",
      helpful: 6
    },
    {
      id: 9,
      customerName: "Robert Lee",
      email: "robert@example.com",
      product: "Webcam",
      rating: 3,
      comment: "Decent video quality for the price.",
      status: "published",
      date: "2024-01-07",
      helpful: 4
    },
    {
      id: 10,
      customerName: "Maria Rodriguez",
      email: "maria@example.com",
      product: "Tablet",
      rating: 5,
      comment: "Excellent performance and battery life. Very satisfied!",
      status: "published",
      date: "2024-01-06",
      helpful: 11
    },
    {
      id: 11,
      customerName: "James Taylor",
      email: "james@example.com",
      product: "Charger",
      rating: 2,
      comment: "Charges slowly and gets hot during use.",
      status: "flagged",
      date: "2024-01-05",
      helpful: 2
    },
    {
      id: 12,
      customerName: "Emma Davis",
      email: "emma@example.com",
      product: "Smart TV",
      rating: 4,
      comment: "Great picture quality but remote is unresponsive sometimes.",
      status: "pending",
      date: "2024-01-04",
      helpful: 5
    },
    {
      id: 13,
      customerName: "Alex Turner",
      email: "alex@example.com",
      product: "Gaming Chair",
      rating: 5,
      comment: "Super comfortable for long gaming sessions!",
      status: "published",
      date: "2024-01-03",
      helpful: 13
    },
    {
      id: 14,
      customerName: "Sophie Miller",
      email: "sophie@example.com",
      product: "Desk Lamp",
      rating: 4,
      comment: "Good lighting but could be brighter.",
      status: "published",
      date: "2024-01-02",
      helpful: 3
    },
    {
      id: 15,
      customerName: "Ryan White",
      email: "ryan@example.com",
      product: "Power Bank",
      rating: 3,
      comment: "Average capacity, takes long to charge.",
      status: "pending",
      date: "2024-01-01",
      helpful: 2
    }
  ];

  // Filter and search logic
  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = 
      feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || feedback.status === filterStatus;
    const matchesRating = filterRating === "all" || feedback.rating.toString() === filterRating;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedback = filteredFeedback.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "flagged": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feedback Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor and manage customer feedback and reviews.</p>
        </div>
      </div>

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <CardTitle className="dark:text-white">All Feedback ({filteredFeedback.length})</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search feedback..."
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
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-32 dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800">
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid gap-4 md:hidden">
              {paginatedFeedback.map((feedback) => (
                <div key={feedback.id} className="p-4 border dark:border-gray-700 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{feedback.customerName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.product}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                    <Badge className={getStatusColor(feedback.status)}>{feedback.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{feedback.comment}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{feedback.date}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Comment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFeedback.map((feedback) => (
                  <tr key={feedback.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{feedback.customerName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{feedback.product}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(feedback.rating)}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({feedback.rating})</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{feedback.comment}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(feedback.status)}>{feedback.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{feedback.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          <Eye className="h-3 w-3" />
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

export default FeedbackManagement;
