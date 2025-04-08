
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";

const SettingsPage = () => {
  // Personal information state
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  
  // Display settings state
  const [compactView, setCompactView] = useState(false);
  const [showBorrowedItems, setShowBorrowedItems] = useState(true);
  
  // Privacy settings state
  const [shareProfile, setShareProfile] = useState(false);
  
  const handleSavePersonalInfo = () => {
    toast.success("Personal information saved successfully!");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved successfully!");
  };
  
  const handleSaveDisplaySettings = () => {
    toast.success("Display preferences saved successfully!");
  };
  
  const handleSavePrivacySettings = () => {
    toast.success("Privacy settings saved successfully!");
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6 text-purple-800 dark:text-purple-300">Settings</h1>
      
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              
              <Button onClick={handleSavePersonalInfo} className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <Button className="bg-purple-600 hover:bg-purple-700">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive in-app notifications</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reminder Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive reminders about due dates</p>
                </div>
                <Switch 
                  checked={reminderNotifications} 
                  onCheckedChange={setReminderNotifications} 
                />
              </div>
              
              <Button onClick={handleSaveNotifications} className="mt-4 bg-purple-600 hover:bg-purple-700">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize the way content is displayed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compact View</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display items in a more compact format</p>
                </div>
                <Switch 
                  checked={compactView} 
                  onCheckedChange={setCompactView} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Borrowed Items</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display currently borrowed items in dashboard</p>
                </div>
                <Switch 
                  checked={showBorrowedItems} 
                  onCheckedChange={setShowBorrowedItems} 
                />
              </div>
              
              <Button onClick={handleSaveDisplaySettings} className="mt-4 bg-purple-600 hover:bg-purple-700">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Share Profile Information</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to see your profile information</p>
                </div>
                <Switch 
                  checked={shareProfile} 
                  onCheckedChange={setShareProfile} 
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="font-medium">Data Retention</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose how long to keep your borrowing history</p>
                <RadioGroup defaultValue="forever" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30days" id="30days" />
                    <Label htmlFor="30days">30 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="90days" id="90days" />
                    <Label htmlFor="90days">90 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1year" id="1year" />
                    <Label htmlFor="1year">1 year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="forever" id="forever" />
                    <Label htmlFor="forever">Forever</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button onClick={handleSavePrivacySettings} className="mt-4 bg-purple-600 hover:bg-purple-700">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default SettingsPage;
