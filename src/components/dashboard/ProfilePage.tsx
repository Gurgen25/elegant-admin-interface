
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Save, Camera } from "lucide-react";

interface ProfilePageProps {
  userRole: 'admin' | 'moderator' | 'user';
}

const ProfilePage = ({ userRole }: ProfilePageProps) => {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe", 
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main Street, City, State 12345",
    bio: "Experienced administrator with 5+ years in system management.",
    company: "Tech Solutions Inc.",
    department: "IT Administration",
    joinDate: "2020-01-15"
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically send the data to your PHP backend
    console.log("Saving profile data:", profileData);
    alert("Profile updated successfully!");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'moderator': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarContent src="" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {profileData.firstName} {profileData.lastName}
              </h3>
              
              <Badge className={`mt-2 ${getRoleBadgeColor(userRole)}`}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Badge>
              
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {profileData.bio}
              </p>

              <div className="mt-4 space-y-2 w-full">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  {profileData.email}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  {profileData.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {profileData.address}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined {new Date(profileData.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Edit Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Edit Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={profileData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={profileData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
              />
            </div>

            <Separator />

            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Profile Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
