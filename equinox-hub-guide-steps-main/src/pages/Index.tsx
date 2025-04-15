
import MainLayout from "@/components/layout/MainLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Book, Check, Database, AlertTriangle, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NotificationPopover from "@/components/shared/NotificationPopover";
import DashboardNotifications from "@/components/dashboard/DashboardNotifications";
import { useState } from "react";

// Mock data for the dashboard
const mockData = {
  availableBooks: 124,
  borrowedBooks: 45,
  overdueBooks: 12,
  availableEquipmentICS: 45,
  borrowedEquipmentICS: 15,
  overdueEquipmentICS: 3,
  availableEquipmentPAR: 22,
  borrowedEquipmentPAR: 8,
  overdueEquipmentPAR: 2,
  totalBooks: 181,
  totalEquipmentICS: 63,
  totalEquipmentPAR: 32
};

// Overdue books with accurate due dates (all in the past)
export const overdueBooks = [
  { id: 2, bookNo: "B1002", title: "Advanced Web Development", author: "Sarah Jones", location: "Shelf B", year: 2021, borrower: "Juan Dela Cruz", borrowDate: "2025-02-15", dueDate: "2025-03-22", daysOverdue: 14 },
  { id: 5, bookNo: "B1005", title: "Machine Learning Basics", author: "David Wilson", location: "Shelf B", year: 2020, borrower: "Pedro Reyes", borrowDate: "2025-02-20", dueDate: "2025-03-15", daysOverdue: 21 },
  { id: 7, bookNo: "B1007", title: "Software Engineering", author: "Robert Johnson", location: "Shelf C", year: 2021, borrower: "Carlos Tan", borrowDate: "2025-03-01", dueDate: "2025-03-25", daysOverdue: 11 },
];

// Overdue equipment with accurate due dates (all in the past)
export const overdueEquipment = [
  { id: 2, propertyNo: "E1002", description: "Projector", quantity: 1, unit: "pc", borrower: "Maria Santos", borrowDate: "2025-03-08", dueDate: "2025-03-20", daysOverdue: 16 },
  { id: 6, propertyNo: "E1006", description: "3D Printer", quantity: 1, unit: "pc", borrower: "Sofia Lim", borrowDate: "2025-03-04", dueDate: "2025-03-18", daysOverdue: 18 },
];

// User/borrower data
export const borrowers = [
  { id: 1, name: "Juan Dela Cruz", role: "Student", borrowed: 3, overdue: 1 },
  { id: 2, name: "Maria Santos", role: "Faculty", borrowed: 5, overdue: 0 },
  { id: 3, name: "Carlos Tan", role: "Student", borrowed: 2, overdue: 2 },
  { id: 4, name: "Ana Gonzales", role: "Staff", borrowed: 1, overdue: 0 },
  { id: 5, name: "Sofia Lim", role: "Student", borrowed: 4, overdue: 1 },
];

// Calculate the total number of registered users correctly from the borrowers list
const totalRegisteredUsers = borrowers.length;

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Dashboard</h1>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            <Input 
              placeholder="Search..." 
              className="pl-10 border-purple-200 focus-visible:ring-purple-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <NotificationPopover />
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Total Books"
            count={mockData.totalBooks}
            icon={<BookOpen size={20} />}
            linkTo="/books"
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            textColor="text-white"
          />
          
          <DashboardCard
            title="Total Equipment"
            count={mockData.totalEquipmentICS + mockData.totalEquipmentPAR}
            icon={<Database size={20} />}
            linkTo="/equipment"
            bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
            textColor="text-white"
          />
          
          <DashboardCard
            title="Registered Users"
            count={totalRegisteredUsers}
            icon={<Users size={20} />}
            linkTo="/users"
            bgColor="bg-gradient-to-br from-violet-500 to-violet-600"
            textColor="text-white"
          />
        </div>

        <DashboardNotifications />

        <section>
          <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">Books Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Available Books"
              count={mockData.availableBooks}
              icon={<Book size={20} />}
              linkTo="/reports/available-books"
              bgColor="bg-gradient-to-br from-purple-400 to-purple-500"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Borrowed Books"
              count={mockData.borrowedBooks}
              icon={<Check size={20} />}
              linkTo="/reports/borrowed-books"
              bgColor="bg-gradient-to-br from-green-500 to-green-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Overdue Books"
              count={overdueBooks.length}
              icon={<AlertTriangle size={20} />}
              linkTo="/reports/overdue-books"
              bgColor="bg-gradient-to-br from-red-500 to-red-600"
              textColor="text-white"
            />
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">Equipment/ICS Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Available ICS"
              count={mockData.availableEquipmentICS}
              icon={<Database size={20} />}
              linkTo="/reports/available-equipment-ics"
              bgColor="bg-gradient-to-br from-violet-400 to-violet-500"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Borrowed ICS"
              count={mockData.borrowedEquipmentICS}
              icon={<Check size={20} />}
              linkTo="/reports/borrowed-equipment-ics"
              bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Overdue ICS"
              count={overdueEquipment.length}
              icon={<AlertTriangle size={20} />}
              linkTo="/reports/overdue-equipment-ics"
              bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
              textColor="text-white"
            />
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">Equipment/PAR Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Available PAR"
              count={mockData.availableEquipmentPAR}
              icon={<Database size={20} />}
              linkTo="/reports/available-equipment-par"
              bgColor="bg-gradient-to-br from-blue-400 to-blue-500"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Borrowed PAR"
              count={mockData.borrowedEquipmentPAR}
              icon={<Check size={20} />}
              linkTo="/reports/borrowed-equipment-par"
              bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Overdue PAR"
              count={overdueEquipment.filter(item => item.propertyNo.startsWith('P')).length}
              icon={<AlertTriangle size={20} />}
              linkTo="/reports/overdue-equipment-par"
              bgColor="bg-gradient-to-br from-amber-500 to-amber-600"
              textColor="text-white"
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
