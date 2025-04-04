
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BooksPage from "./pages/BooksPage";
import EquipmentPage from "./pages/EquipmentPage";
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
          
          <Route
            path="/equipment"
            element={
              <ProtectedRoute>
                <EquipmentPage />
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
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
