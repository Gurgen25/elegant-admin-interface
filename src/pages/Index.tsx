
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ProductsManagement from "@/components/dashboard/ProductsManagement";
import OrdersManagement from "@/components/dashboard/OrdersManagement";
import CustomersManagement from "@/components/dashboard/CustomersManagement";
import PaymentsManagement from "@/components/dashboard/PaymentsManagement";
import UsersManagement from "@/components/dashboard/UsersManagement";
import FeedbackManagement from "@/components/dashboard/FeedbackManagement";
import AdminsManagement from "@/components/dashboard/AdminsManagement";
import ModeratorsManagement from "@/components/dashboard/ModeratorsManagement";
import Analytics from "@/components/dashboard/Analytics";
import Settings from "@/components/dashboard/Settings";
import ProfilePage from "@/components/dashboard/ProfilePage";
import LoginPage from "@/components/auth/LoginPage";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState('en');
  const [userRole, setUserRole] = useState<'admin' | 'moderator' | 'user'>('admin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = (email: string, password: string, role: 'admin' | 'moderator' | 'user') => {
    // Here you would typically validate credentials with your PHP backend
    console.log("Login attempt:", { email, password, role });
    
    setUserRole(role);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection("dashboard");
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  };

  const handleProfileClick = () => {
    setActiveSection("profile");
  };

  const handleSettingsClick = () => {
    setActiveSection("settings");
  };

  const handleGlobalSearch = (query: string) => {
    setGlobalSearchQuery(query);
    console.log("Global search query:", query);
    // Here you can implement global search logic across all sections
  };

  // Check for existing authentication on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole') as 'admin' | 'moderator' | 'user' | null;
    
    if (savedAuth === 'true' && savedRole) {
      setIsAuthenticated(true);
      setUserRole(savedRole);
    }
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "products":
        return <ProductsManagement />;
      case "orders":
        return <OrdersManagement />;
      case "customers":
        return <CustomersManagement />;
      case "payments":
        return <PaymentsManagement />;
      case "users":
        return <UsersManagement />;
      case "feedback":
        return <FeedbackManagement />;
      case "admins":
        return <AdminsManagement />;
      case "moderators":
        return <ModeratorsManagement userRole={userRole} />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      case "profile":
        return <ProfilePage userRole={userRole} />;
      default:
        return <DashboardOverview />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole={userRole}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          userRole={userRole}
          onSearch={handleGlobalSearch}
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
