
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string, password: string, role: 'admin' | 'moderator' | 'user') => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication - replace with actual PHP backend call
    try {
      // Demo credentials for testing
      const demoCredentials = [
        { email: "admin@demo.com", password: "admin123", role: "admin" as const },
        { email: "moderator@demo.com", password: "mod123", role: "moderator" as const },
        { email: "user@demo.com", password: "user123", role: "user" as const },
      ];

      const user = demoCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (user) {
        // Simulate API delay
        setTimeout(() => {
          onLogin(email, password, user.role);
          setIsLoading(false);
        }, 1000);
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</span>
          </div>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your credentials to access the dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@demo.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>Admin: admin@demo.com / admin123</div>
              <div>Moderator: moderator@demo.com / mod123</div>
              <div>User: user@demo.com / user123</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
