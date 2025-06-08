
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  Building2,
  ShoppingCart,
  Package,
  CreditCard,
  UserCheck,
  Shield,
  MessageSquare
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userRole: 'admin' | 'moderator' | 'user';
}

const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed, userRole }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: UserCheck },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "users", label: "Users", icon: Users },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const controllerItems = [
    { id: "admins", label: "Admins", icon: Shield, roles: ['admin'] },
    { id: "moderators", label: "Moderators", icon: Shield, roles: ['admin', 'moderator'] },
  ];

  const filteredControllerItems = controllerItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 z-30 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">E-Commerce Admin</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <nav className="mt-6 px-3">
        {/* Main Menu Items */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 mb-2 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
        
        {/* Controllers Section */}
        {(userRole === 'admin' || userRole === 'moderator') && filteredControllerItems.length > 0 && (
          <>
            {!collapsed && (
              <div className="mt-6 mb-3 px-3">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Controllers
                </h3>
              </div>
            )}
            {filteredControllerItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 mb-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
