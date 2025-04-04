
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    libraryName: "Equinox Library",
    email: "admin@equinoxlibrary.com",
    defaultBorrowDays: 7,
    enableNotifications: true,
    enableOverdueReminders: true,
    darkMode: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your library's basic settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="libraryName">Library Name</Label>
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
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
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
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Admin Account</CardTitle>
            <CardDescription>Manage your admin account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="admin" />
              </div>
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
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Account</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
