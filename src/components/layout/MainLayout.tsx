
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Book, Database, Calendar, LayoutDashboard, FileIcon, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string>(window.location.pathname);
  const { toast } = useToast();

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r shadow-md">
          <SidebarHeader className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <div className="flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <h1 className="text-2xl font-bold text-white">RIC</h1>
              </div>
              <h1 className="text-xl font-bold">RIC-XI</h1>
              <p className="text-sm text-blue-100">Inventory System</p>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-gradient-to-b from-blue-50 to-white">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/'} 
                  onClick={() => handleNavigation('/')}
                  className="hover:bg-blue-100 hover:text-blue-700"
                >
                  <LayoutDashboard className={activeItem === '/' ? "text-blue-600" : ""} />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/books'} 
                  onClick={() => handleNavigation('/books')}
                  className="hover:bg-blue-100 hover:text-blue-700"
                >
                  <Book className={activeItem === '/books' ? "text-blue-600" : ""} />
                  <span>Books</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/equipment'} 
                  onClick={() => handleNavigation('/equipment')}
                  className="hover:bg-blue-100 hover:text-blue-700"
                >
                  <Database className={activeItem === '/equipment' ? "text-blue-600" : ""} />
                  <span>Equipment</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/borrowing'} 
                  onClick={() => handleNavigation('/borrowing')}
                  className="hover:bg-blue-100 hover:text-blue-700"
                >
                  <Calendar className={activeItem === '/borrowing' ? "text-blue-600" : ""} />
                  <span>Borrowing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem.startsWith('/reports')} 
                  onClick={() => handleNavigation('/reports')}
                  className="hover:bg-blue-100 hover:text-blue-700"
                >
                  <FileIcon className={activeItem.startsWith('/reports') ? "text-blue-600" : ""} />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/settings'} 
                  onClick={() => handleNavigation('/settings')}
                  className="hover:bg-blue-100 hover:text-blue-700"
                >
                  <Settings className={activeItem === '/settings' ? "text-blue-600" : ""} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="bg-gradient-to-t from-blue-50 to-white border-t">
            <div className="p-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
              <div className="mt-4 text-xs text-center text-muted-foreground">
                © 2025 RIC-XI Inventory System
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h2 className="text-xl font-bold text-blue-800">{getPageTitle(activeItem)}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-blue-700">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700 hidden md:inline">Admin User</span>
                </div>
                <div className="bg-blue-700 text-white px-3 py-1 rounded-md text-sm">Admin</div>
              </div>
            </div>
          </div>
          <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-blue-50/30">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

function getPageTitle(path: string): string {
  switch (path) {
    case '/':
      return 'Dashboard';
    case '/books':
      return 'Books Management';
    case '/equipment':
      return 'Equipment Management';
    case '/borrowing':
      return 'Borrowing Transactions';
    case '/reports':
      return 'Reports';
    case '/settings':
      return 'Settings';
    case '/reports/available-books':
      return 'Available Books';
    case '/reports/borrowed-books':
      return 'Borrowed Books';
    case '/reports/overdue-books':
      return 'Overdue Books';
    case '/reports/available-equipment':
      return 'Available Equipment';
    case '/reports/borrowed-equipment':
      return 'Borrowed Equipment';
    case '/reports/overdue-equipment':
      return 'Overdue Equipment';
    default:
      return 'RIC-XI Inventory';
  }
}

export default MainLayout;
