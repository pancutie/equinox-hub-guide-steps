
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
  BookOpen, 
  Clipboard,
  Presentation,
  GraduationCap,
  Sparkles,
  Award,
  BellRing
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
        <Sidebar className="border-r shadow-xl bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
          <SidebarHeader className="bg-gradient-to-r from-purple-800 to-purple-900 text-white">
            <div className="flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 shadow-inner shadow-purple-800/30 backdrop-blur-sm border border-white/10 pulse-animation">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                  <h1 className="text-2xl font-bold text-white">RIC</h1>
                </div>
              </div>
              <h1 className="text-xl font-bold text-white">RIC-XI</h1>
              <p className="text-sm text-purple-100 opacity-80">Inventory System</p>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-gradient-to-b from-purple-900/95 to-indigo-900/95 text-white">
            <SidebarGroup>
              <SidebarGroupLabel className="text-purple-200 uppercase text-xs tracking-wider font-semibold">Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === '/'} 
                      onClick={() => handleNavigation('/')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <LayoutDashboard className={activeItem === '/' ? "text-purple-300" : "text-white/70"} />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === '/books'} 
                      onClick={() => handleNavigation('/books')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <BookOpen className={activeItem === '/books' ? "text-purple-300" : "text-white/70"} />
                      <span>Books</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/equipment')} 
                      onClick={() => handleNavigation('/equipment')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <Database className={activeItem.startsWith('/equipment') ? "text-purple-300" : "text-white/70"} />
                      <span>Equipment</span>
                    </SidebarMenuButton>
                    
                    {activeItem.startsWith('/equipment') && (
                      <SidebarMenuSub className="bg-gradient-to-r from-purple-950 to-indigo-950">
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            isActive={activeItem === '/equipment/ics'}
                            onClick={() => handleNavigation('/equipment/ics')}
                            className="text-white/80 hover:text-white"
                          >
                            <Database size={14} />
                            <span>Equipment/ICS</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            isActive={activeItem === '/equipment/par'}
                            onClick={() => handleNavigation('/equipment/par')}
                            className="text-white/80 hover:text-white"
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
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <Calendar className={activeItem === '/borrowing' ? "text-purple-300" : "text-white/70"} />
                      <span>Borrowing</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/reports')} 
                      onClick={() => handleNavigation('/reports')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <FileIcon className={activeItem.startsWith('/reports') ? "text-purple-300" : "text-white/70"} />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-purple-200 uppercase text-xs tracking-wider font-semibold">Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/projects/research')} 
                      onClick={() => handleNavigation('/projects/research')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <GraduationCap className={activeItem.startsWith('/projects/research') ? "text-purple-300" : "text-white/70"} />
                      <span>Research Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/projects/extension')} 
                      onClick={() => handleNavigation('/projects/extension')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <Award className={activeItem.startsWith('/projects/extension') ? "text-purple-300" : "text-white/70"} />
                      <span>Extension Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/projects/research-activities')} 
                      onClick={() => handleNavigation('/projects/research-activities')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <Sparkles className={activeItem.startsWith('/projects/research-activities') ? "text-purple-300" : "text-white/70"} />
                      <span>Research Activities</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem.startsWith('/projects/extension-activities')} 
                      onClick={() => handleNavigation('/projects/extension-activities')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <Presentation className={activeItem.startsWith('/projects/extension-activities') ? "text-purple-300" : "text-white/70"} />
                      <span>Extension Activities</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-purple-200 uppercase text-xs tracking-wider font-semibold">System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === '/settings'} 
                      onClick={() => handleNavigation('/settings')}
                      className="hover:bg-white/10 text-white hover:text-white transition-colors duration-300"
                    >
                      <Settings className={activeItem === '/settings' ? "text-purple-300" : "text-white/70"} />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="bg-gradient-to-t from-indigo-950 to-purple-950 border-t border-white/10">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 shadow-inner">
                <Avatar className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 border border-white/20">
                  <AvatarFallback className="text-white font-semibold">A</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-white">Admin User</p>
                  <p className="text-xs text-purple-200/80">admin@ric-xi.edu</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 bg-white/5 text-white hover:text-white hover:bg-red-500/20 border-white/10 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
              <div className="mt-4 text-xs text-center text-purple-200/60">
                © 2025 RIC-XI Inventory System
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b shadow-md p-4 bg-gradient-to-r from-white to-purple-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h2 className="text-xl font-bold text-purple-800">{getPageTitle(activeItem)}</h2>
              </div>
              <div className="flex items-center gap-3">
                <BellRing className="text-purple-500 h-5 w-5" />
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-600 to-purple-700 border-2 border-purple-200">
                    <AvatarFallback className="text-white font-semibold">A</AvatarFallback>
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
