
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
import { Book, Database, Calendar, LayoutDashboard, FileIcon, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
        <Sidebar className="border-r shadow-sm">
          <SidebarHeader>
            <div className="flex flex-col items-center justify-center p-4">
              <h1 className="text-xl font-bold text-primary">RIC-XI</h1>
              <p className="text-sm text-muted-foreground">Inventory System</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/'} 
                  onClick={() => handleNavigation('/')}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/books'} 
                  onClick={() => handleNavigation('/books')}
                >
                  <Book />
                  <span>Books</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/equipment'} 
                  onClick={() => handleNavigation('/equipment')}
                >
                  <Database />
                  <span>Equipment</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/borrowing'} 
                  onClick={() => handleNavigation('/borrowing')}
                >
                  <Calendar />
                  <span>Borrowing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem.startsWith('/reports')} 
                  onClick={() => handleNavigation('/reports')}
                >
                  <FileIcon />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeItem === '/settings'} 
                  onClick={() => handleNavigation('/settings')}
                >
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
                <h2 className="text-xl font-bold text-primary">{getPageTitle(activeItem)}</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary text-white px-3 py-1 rounded-md text-sm">Admin</div>
              </div>
            </div>
          </div>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
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
