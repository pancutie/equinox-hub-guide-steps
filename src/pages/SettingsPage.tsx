
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Settings</h1>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="Admin User" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Your email" defaultValue="admin@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Your role" defaultValue="Administrator" disabled />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Label className="text-base font-semibold">Security</Label>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="overdue-email" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for overdue items</p>
                  </div>
                  <Switch id="overdue-email" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-notif" className="text-base">System Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications in the system</p>
                  </div>
                  <Switch id="system-notif" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound-notif" className="text-base">Sound Notifications</Label>
                    <p className="text-sm text-muted-foreground">Play a sound for new notifications</p>
                  </div>
                  <Switch id="sound-notif" defaultChecked />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Label className="text-base font-semibold">Notification Frequency</Label>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="daily-digest" className="text-base">Daily Digest</Label>
                      <p className="text-sm text-muted-foreground">Receive a daily summary of activities</p>
                    </div>
                    <Switch id="daily-digest" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-digest" className="text-base">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Receive a weekly summary of activities</p>
                    </div>
                    <Switch id="weekly-digest" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system-wide settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backup" className="text-base">Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Enable automatic database backups</p>
                  </div>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics" className="text-base">Analytics Collection</Label>
                    <p className="text-sm text-muted-foreground">Allow system to collect usage analytics</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cache-days" className="text-base">Cache Duration</Label>
                    <p className="text-sm text-muted-foreground">Maximum days to keep cached data</p>
                  </div>
                  <Input id="cache-days" type="number" defaultValue="7" className="w-24" />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Label className="text-base font-semibold">Data Management</Label>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-now">Manual Backup</Label>
                    <div className="flex gap-2">
                      <Input id="backup-now" placeholder="Backup name" />
                      <Button className="shrink-0">Backup Now</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="imported-data">Import Data</Label>
                    <div className="flex gap-2">
                      <Input id="imported-data" type="file" />
                      <Button className="shrink-0">Upload</Button>
                    </div>
                  </div>
                  
                  <Button variant="destructive" className="w-full sm:w-auto mt-2">
                    Export All Data
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default SettingsPage;
