
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    libraryName: "RIC-XI Inventory System",
    email: "admin@ricxi.edu.ph",
    defaultBorrowDays: 7,
    enableNotifications: true,
    enableOverdueReminders: true,
    darkMode: false
  });

  const [accountSettings, setAccountSettings] = useState({
    username: "admin",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleAccountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated successfully",
    });
  };

  const handleUpdateAccount = () => {
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "New password and confirm password do not match",
      });
      return;
    }

    if (accountSettings.newPassword && !accountSettings.currentPassword) {
      toast({
        variant: "destructive",
        title: "Current Password Required",
        description: "Please enter your current password",
      });
      return;
    }

    // Reset password fields
    setAccountSettings(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));

    toast({
      title: "Account Updated",
      description: "Your account has been updated successfully",
    });
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your inventory system's basic settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="libraryName">System Name</Label>
              <Input 
                id="libraryName" 
                name="libraryName"
                value={settings.libraryName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email"
                value={settings.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultBorrowDays">Default Borrowing Period (days)</Label>
              <Input 
                id="defaultBorrowDays" 
                name="defaultBorrowDays"
                type="number"
                value={settings.defaultBorrowDays}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how the system notifies you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableNotifications">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for new borrowings
                </p>
              </div>
              <Switch 
                id="enableNotifications" 
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleSwitchChange("enableNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableOverdueReminders">Overdue Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Send reminders for overdue items
                </p>
              </div>
              <Switch 
                id="enableOverdueReminders" 
                checked={settings.enableOverdueReminders}
                onCheckedChange={(checked) => handleSwitchChange("enableOverdueReminders", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch 
                id="darkMode" 
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSwitchChange("darkMode", checked)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2 border shadow-sm">
          <CardHeader>
            <CardTitle>Admin Account</CardTitle>
            <CardDescription>Manage your admin account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  name="username"
                  value={accountSettings.username}
                  onChange={handleAccountInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  name="currentPassword"
                  type="password"
                  value={accountSettings.currentPassword}
                  onChange={handleAccountInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  name="newPassword"
                  type="password"
                  value={accountSettings.newPassword}
                  onChange={handleAccountInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={accountSettings.confirmPassword}
                  onChange={handleAccountInputChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpdateAccount}>Update Account</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
