
import { useState } from "react";
import { Bell, Search, User, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  language: string;
  setLanguage: (language: string) => void;
  userRole: 'admin' | 'moderator' | 'user';
  onSearch?: (query: string) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
}

const Header = ({ 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  theme, 
  setTheme, 
  language, 
  setLanguage,
  userRole,
  onSearch,
  onProfileClick,
  onSettingsClick,
  onLogout
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search across all sections..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 w-80 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Globe className="h-4 w-4 mr-2" />
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium capitalize">{userRole}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800">
              <DropdownMenuItem 
                onClick={onProfileClick}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onSettingsClick}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onLogout}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
