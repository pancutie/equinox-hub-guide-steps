
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BooksPage from "./pages/BooksPage";
import EquipmentPage from "./pages/EquipmentPage";
import EquipmentICPage from "./pages/equipment/EquipmentICPage";
import EquipmentPARPage from "./pages/equipment/EquipmentPARPage";
import BorrowingPage from "./pages/BorrowingPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import AvailableBooksPage from "./pages/reports/AvailableBooksPage";
import BorrowedBooksPage from "./pages/reports/BorrowedBooksPage";
import OverdueBooksPage from "./pages/reports/OverdueBooksPage";
import AvailableEquipmentPage from "./pages/reports/AvailableEquipmentPage";
import BorrowedEquipmentPage from "./pages/reports/BorrowedEquipmentPage";
import OverdueEquipmentPage from "./pages/reports/OverdueEquipmentPage";
import AvailableEquipmentICSPage from "./pages/reports/AvailableEquipmentICSPage";
import BorrowedEquipmentICSPage from "./pages/reports/BorrowedEquipmentICSPage";
import OverdueEquipmentICSPage from "./pages/reports/OverdueEquipmentICSPage";
import AvailableEquipmentPARPage from "./pages/reports/AvailableEquipmentPARPage";
import BorrowedEquipmentPARPage from "./pages/reports/BorrowedEquipmentPARPage";
import OverdueEquipmentPARPage from "./pages/reports/OverdueEquipmentPARPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ResearchProjectsPage from "./pages/projects/ResearchProjectsPage";
import ExtensionProjectsPage from "./pages/projects/ExtensionProjectsPage";
import ResearchActivitiesPage from "./pages/projects/ResearchActivitiesPage";
import ExtensionActivitiesPage from "./pages/projects/ExtensionActivitiesPage";
import YearDetailsPage from "./pages/projects/YearDetailsPage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import AutoReportPage from "./pages/reports/AutoReportPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BooksPage />
                </ProtectedRoute>
              }
            />
            
            {/* Equipment Routes */}
            <Route
              path="/equipment"
              element={
                <ProtectedRoute>
                  <EquipmentPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/equipment/ics"
              element={
                <ProtectedRoute>
                  <EquipmentICPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/equipment/par"
              element={
                <ProtectedRoute>
                  <EquipmentPARPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/borrowing"
              element={
                <ProtectedRoute>
                  <BorrowingPage />
                </ProtectedRoute>
              }
            />
            
            {/* Reports Routes */}
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/available-books"
              element={
                <ProtectedRoute>
                  <AvailableBooksPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/borrowed-books"
              element={
                <ProtectedRoute>
                  <BorrowedBooksPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/overdue-books"
              element={
                <ProtectedRoute>
                  <OverdueBooksPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/available-equipment"
              element={
                <ProtectedRoute>
                  <AvailableEquipmentPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/borrowed-equipment"
              element={
                <ProtectedRoute>
                  <BorrowedEquipmentPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/overdue-equipment"
              element={
                <ProtectedRoute>
                  <OverdueEquipmentPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/available-equipment-ics"
              element={
                <ProtectedRoute>
                  <AvailableEquipmentICSPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/borrowed-equipment-ics"
              element={
                <ProtectedRoute>
                  <BorrowedEquipmentICSPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/overdue-equipment-ics"
              element={
                <ProtectedRoute>
                  <OverdueEquipmentICSPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/available-equipment-par"
              element={
                <ProtectedRoute>
                  <AvailableEquipmentPARPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/borrowed-equipment-par"
              element={
                <ProtectedRoute>
                  <BorrowedEquipmentPARPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/overdue-equipment-par"
              element={
                <ProtectedRoute>
                  <OverdueEquipmentPARPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports/auto-report"
              element={
                <ProtectedRoute>
                  <AutoReportPage />
                </ProtectedRoute>
              }
            />
            
            {/* Analytics Route */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Projects Dashboard Route */}
            <Route
              path="/projects-dashboard"
              element={
                <ProtectedRoute>
                  <ProjectsDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Users Route */}
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            
            {/* Projects Routes */}
            <Route
              path="/projects/research"
              element={
                <ProtectedRoute>
                  <ResearchProjectsPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/projects/extension"
              element={
                <ProtectedRoute>
                  <ExtensionProjectsPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/projects/research-activities"
              element={
                <ProtectedRoute>
                  <ResearchActivitiesPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/projects/extension-activities"
              element={
                <ProtectedRoute>
                  <ExtensionActivitiesPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/projects/:projectType/:year"
              element={
                <ProtectedRoute>
                  <YearDetailsPage />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
