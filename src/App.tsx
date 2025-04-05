
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ResearchProjectsPage from "./pages/projects/ResearchProjectsPage";
import ExtensionProjectsPage from "./pages/projects/ExtensionProjectsPage";
import ResearchActivitiesPage from "./pages/projects/ResearchActivitiesPage";
import ExtensionActivitiesPage from "./pages/projects/ExtensionActivitiesPage";
import YearDetailsPage from "./pages/projects/YearDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
