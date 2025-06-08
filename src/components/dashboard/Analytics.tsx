
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Eye, Users, Clock, Target, ArrowUpRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const Analytics = () => {
  const performanceData = [
    { name: 'Mon', pageViews: 4000, uniqueVisitors: 2400, bounceRate: 35 },
    { name: 'Tue', pageViews: 3000, uniqueVisitors: 1398, bounceRate: 28 },
    { name: 'Wed', pageViews: 2000, uniqueVisitors: 9800, bounceRate: 45 },
    { name: 'Thu', pageViews: 2780, uniqueVisitors: 3908, bounceRate: 32 },
    { name: 'Fri', pageViews: 1890, uniqueVisitors: 4800, bounceRate: 41 },
    { name: 'Sat', pageViews: 2390, uniqueVisitors: 3800, bounceRate: 38 },
    { name: 'Sun', pageViews: 3490, uniqueVisitors: 4300, bounceRate: 29 },
  ];

  const trafficSources = [
    { name: 'Organic Search', value: 45, color: '#3b82f6' },
    { name: 'Direct', value: 25, color: '#10b981' },
    { name: 'Social Media', value: 20, color: '#f59e0b' },
    { name: 'Email', value: 10, color: '#ef4444' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12000, orders: 125 },
    { month: 'Feb', revenue: 15000, orders: 150 },
    { month: 'Mar', revenue: 18000, orders: 180 },
    { month: 'Apr', revenue: 22000, orders: 220 },
    { month: 'May', revenue: 25000, orders: 250 },
    { month: 'Jun', revenue: 28000, orders: 280 },
  ];

  const analyticsStats = [
    {
      title: "Page Views",
      value: "125,432",
      change: "+12.5%",
      icon: Eye,
      color: "blue"
    },
    {
      title: "Unique Visitors",
      value: "45,231",
      change: "+8.3%",
      icon: Users,
      color: "green"
    },
    {
      title: "Avg. Session Duration",
      value: "3m 42s",
      change: "+15.2%",
      icon: Clock,
      color: "purple"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+2.1%",
      icon: Target,
      color: "orange"
    },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50",
      green: "text-green-600 bg-green-50",
      purple: "text-purple-600 bg-purple-50",
      orange: "text-orange-600 bg-orange-50"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your website performance and user behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${getColorClass(stat.color)}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="text-gray-500">from last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="pageViews" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Area type="monotone" dataKey="uniqueVisitors" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{source.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Revenue & Orders Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { page: "/dashboard", views: "15,432", percentage: "25%" },
              { page: "/products", views: "12,345", percentage: "20%" },
              { page: "/analytics", views: "9,876", percentage: "16%" },
              { page: "/users", views: "7,654", percentage: "12%" },
              { page: "/settings", views: "5,432", percentage: "9%" },
            ].map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{page.page}</p>
                  <p className="text-sm text-gray-600">{page.views} views</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{page.percentage}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Device Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { device: "Desktop", users: "28,450", percentage: "65%" },
              { device: "Mobile", users: "12,340", percentage: "28%" },
              { device: "Tablet", users: "3,210", percentage: "7%" },
            ].map((device, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">{device.device}</span>
                  <span className="text-sm text-gray-600">{device.percentage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: device.percentage }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{device.users} users</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { event: "New user registration spike", time: "2 hours ago", type: "success" },
              { event: "High bounce rate detected", time: "4 hours ago", type: "warning" },
              { event: "Server response time improved", time: "6 hours ago", type: "success" },
              { event: "Mobile traffic increased 25%", time: "8 hours ago", type: "info" },
            ].map((event, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  event.type === 'success' ? 'bg-green-500' :
                  event.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{event.event}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
