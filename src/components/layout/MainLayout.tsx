
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
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { 
  Book, 
  Database, 
  Calendar, 
  LayoutDashboard, 
  FileIcon, 
  Settings, 
  LogOut, 
  User, 
  FolderArchive, 
  BookOpen, 
  Clipboard,
  Presentation
} from "lucide-react";
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
          <SidebarHeader className="bg-gradient-to-r from-purple-700 to-purple-900 text-white">
            <div className="flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 shadow-inner shadow-purple-800/30">
                <h1 className="text-2xl font-bold text-white">RIC</h1>
              </div>
              <h1 className="text-xl font-bold">RIC-XI</h1>
              <p className="text-sm text-purple-100">Inventory System</p>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-gradient-to-b from-purple-50 to-white">
            <SidebarGroup>
              <SidebarGroupLabel className="text-purple-800">Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === '/'} 
                      onClick={() => handleNavigation('/')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <LayoutDashboard className={activeItem === '/' ? "text-purple-600" : ""} />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === '/books'} 
                      onClick={() => handleNavigation('/books')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <BookOpen className={activeItem === '/books' ? "text-purple-600" : ""} />
                      <span>Books</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/equipment')} 
                      onClick={() => handleNavigation('/equipment')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <Database className={activeItem.startsWith('/equipment') ? "text-purple-600" : ""} />
                      <span>Equipment</span>
                    </SidebarMenuButton>
                    
                    {activeItem.startsWith('/equipment') && (
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            isActive={activeItem === '/equipment/ics'}
                            onClick={() => handleNavigation('/equipment/ics')}
                          >
                            <Database size={14} />
                            <span>Equipment/ICS</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            isActive={activeItem === '/equipment/par'}
                            onClick={() => handleNavigation('/equipment/par')}
                          >
                            <Clipboard size={14} />
                            <span>Equipment/PAR</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === '/borrowing'} 
                      onClick={() => handleNavigation('/borrowing')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <Calendar className={activeItem === '/borrowing' ? "text-purple-600" : ""} />
                      <span>Borrowing</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/reports')} 
                      onClick={() => handleNavigation('/reports')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <FileIcon className={activeItem.startsWith('/reports') ? "text-purple-600" : ""} />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-purple-800">Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/projects/research')} 
                      onClick={() => handleNavigation('/projects/research')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <Book className={activeItem.startsWith('/projects/research') ? "text-purple-600" : ""} />
                      <span>Research Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/projects/extension')} 
                      onClick={() => handleNavigation('/projects/extension')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <FolderArchive className={activeItem.startsWith('/projects/extension') ? "text-purple-600" : ""} />
                      <span>Extension Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/projects/research-activities')} 
                      onClick={() => handleNavigation('/projects/research-activities')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <Book className={activeItem.startsWith('/projects/research-activities') ? "text-purple-600" : ""} />
                      <span>Research Activities</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/projects/extension-activities')} 
                      onClick={() => handleNavigation('/projects/extension-activities')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <Presentation className={activeItem.startsWith('/projects/extension-activities') ? "text-purple-600" : ""} />
                      <span>Extension Activities</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-purple-800">System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === '/settings'} 
                      onClick={() => handleNavigation('/settings')}
                      className="hover:bg-purple-100 hover:text-purple-700"
                    >
                      <Settings className={activeItem === '/settings' ? "text-purple-600" : ""} />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="bg-gradient-to-t from-purple-50 to-white border-t">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-lg shadow-sm border border-purple-100">
                <Avatar className="h-10 w-10 bg-purple-700">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@ric-xi.edu</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100 transition-colors"
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
                <h2 className="text-xl font-bold text-purple-800">{getPageTitle(activeItem)}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-purple-700">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700 hidden md:inline">Admin User</span>
                </div>
                <div className="bg-purple-700 text-white px-3 py-1 rounded-md text-sm">Admin</div>
              </div>
            </div>
          </div>
          <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-purple-50/30">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

function getPageTitle(path: string): string {
  if (path.startsWith('/projects/research/')) {
    return 'Research Projects - Year ' + path.split('/').pop();
  }
  if (path.startsWith('/projects/extension/')) {
    return 'Extension Projects - Year ' + path.split('/').pop();
  }
  if (path.startsWith('/projects/research-activities/')) {
    return 'Research Activities - Year ' + path.split('/').pop();
  }
  if (path.startsWith('/projects/extension-activities/')) {
    return 'Extension Activities - Year ' + path.split('/').pop();
  }

  switch (path) {
    case '/':
      return 'Dashboard';
    case '/books':
      return 'Books Management';
    case '/equipment':
      return 'Equipment Management';
    case '/equipment/ics':
      return 'Equipment/ICS Management';
    case '/equipment/par':
      return 'Equipment/PAR Management';
    case '/borrowing':
      return 'Borrowing Transactions';
    case '/reports':
      return 'Reports';
    case '/settings':
      return 'Settings';
    case '/projects/research':
      return 'Research Projects';
    case '/projects/extension':
      return 'Extension Projects';
    case '/projects/research-activities':
      return 'Research Activities';
    case '/projects/extension-activities':
      return 'Extension Activities';
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
