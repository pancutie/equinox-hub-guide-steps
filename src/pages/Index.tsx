import MainLayout from "@/components/layout/MainLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Book, Check, Database, AlertTriangle, BookOpen, Users, BarChart, Clipboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import NotificationPopover from "@/components/shared/NotificationPopover";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

// Monthly borrowing data for chart
const borrowingData = [
  { month: 'Jan', books: 32, equipmentICS: 18, equipmentPAR: 12 },
  { month: 'Feb', books: 28, equipmentICS: 15, equipmentPAR: 10 },
  { month: 'Mar', books: 34, equipmentICS: 21, equipmentPAR: 14 },
  { month: 'Apr', books: 39, equipmentICS: 25, equipmentPAR: 16 },
  { month: 'May', books: 45, equipmentICS: 23, equipmentPAR: 15 },
  { month: 'Jun', books: 41, equipmentICS: 19, equipmentPAR: 13 },
];

// Pie chart data
const bookStatusData = [
  { name: 'Available', value: mockData.availableBooks, color: '#8b5cf6' },
  { name: 'Borrowed', value: mockData.borrowedBooks, color: '#10b981' },
  { name: 'Overdue', value: mockData.overdueBooks, color: '#ef4444' },
];

const equipmentICSStatusData = [
  { name: 'Available', value: mockData.availableEquipmentICS, color: '#9333ea' },
  { name: 'Borrowed', value: mockData.borrowedEquipmentICS, color: '#14b8a6' },
  { name: 'Overdue', value: mockData.overdueEquipmentICS, color: '#f97316' },
];

const equipmentPARStatusData = [
  { name: 'Available', value: mockData.availableEquipmentPAR, color: '#6366f1' },
  { name: 'Borrowed', value: mockData.borrowedEquipmentPAR, color: '#22c55e' },
  { name: 'Overdue', value: mockData.overdueEquipmentPAR, color: '#f59e0b' },
];

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

// Recent activity
const recentActivities = [
  { id: 1, user: "Maria Santos", action: "borrowed", item: "Projector", type: "Equipment ICS", time: "3 hours ago" },
  { id: 2, user: "Juan Dela Cruz", action: "returned", item: "Advanced Web Development", type: "Book", time: "5 hours ago" },
  { id: 3, user: "Carlos Tan", action: "borrowed", item: "Office Chair", type: "Equipment PAR", time: "8 hours ago" },
  { id: 4, user: "Ana Gonzales", action: "returned", item: "Tablet", type: "Equipment ICS", time: "2 days ago" },
  { id: 5, user: "Sofia Lim", action: "borrowed", item: "3D Printer", type: "Equipment ICS", time: "3 days ago" },
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
        <h1 className="text-2xl font-bold text-purple-800">Dashboard</h1>
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
          <h3 className="text-lg font-semibold mb-3 text-purple-800">Books Summary</h3>
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
              count={mockData.overdueBooks}
              icon={<AlertTriangle size={20} />}
              linkTo="/reports/overdue-books"
              bgColor="bg-gradient-to-br from-red-500 to-red-600"
              textColor="text-white"
            />
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-3 text-purple-800">Equipment/ICS Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Available ICS"
              count={mockData.availableEquipmentICS}
              icon={<Database size={20} />}
              linkTo="/equipment/ics"
              bgColor="bg-gradient-to-br from-violet-400 to-violet-500"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Borrowed ICS"
              count={mockData.borrowedEquipmentICS}
              icon={<Check size={20} />}
              linkTo="/equipment/ics"
              bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Overdue ICS"
              count={mockData.overdueEquipmentICS}
              icon={<AlertTriangle size={20} />}
              linkTo="/equipment/ics"
              bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
              textColor="text-white"
            />
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-purple-800">Equipment/PAR Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Available PAR"
              count={mockData.availableEquipmentPAR}
              icon={<Clipboard size={20} />}
              linkTo="/equipment/par"
              bgColor="bg-gradient-to-br from-blue-400 to-blue-500"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Borrowed PAR"
              count={mockData.borrowedEquipmentPAR}
              icon={<Check size={20} />}
              linkTo="/equipment/par"
              bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Overdue PAR"
              count={mockData.overdueEquipmentPAR}
              icon={<AlertTriangle size={20} />}
              linkTo="/equipment/par"
              bgColor="bg-gradient-to-br from-amber-500 to-amber-600"
              textColor="text-white"
            />
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-purple-100 pb-3">
              <CardTitle className="text-purple-700 flex items-center gap-2 text-lg">
                <BarChart size={18} />
                Monthly Borrowing Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={borrowingData}
                    margin={{ top: 10, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        borderColor: '#ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="books" name="Books" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="equipmentICS" name="Equipment ICS" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="equipmentPAR" name="Equipment PAR" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="border-b border-purple-100 pb-3">
                <CardTitle className="text-purple-700 text-lg">Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1">Books</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bookStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {bookStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} books`, name]}
                            contentStyle={{ 
                              backgroundColor: '#fff',
                              borderColor: '#ddd',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-2 mt-1">
                      {bookStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1">ICS</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={equipmentICSStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {equipmentICSStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} items`, name]}
                            contentStyle={{ 
                              backgroundColor: '#fff',
                              borderColor: '#ddd',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-2 mt-1">
                      {equipmentICSStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1">PAR</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={equipmentPARStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {equipmentPARStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} items`, name]}
                            contentStyle={{ 
                              backgroundColor: '#fff',
                              borderColor: '#ddd',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-2 mt-1">
                      {equipmentPARStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-purple-100 pb-3">
              <CardTitle className="text-purple-700 text-lg">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-1">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 border-b last:border-0 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{activity.user}</p>
                      <p className="text-sm text-gray-600">
                        {activity.action === "borrowed" ? (
                          <span className="text-amber-600">Borrowed</span>
                        ) : (
                          <span className="text-green-600">Returned</span>
                        )}{" "}
                        <span className="font-medium">{activity.item}</span>
                        <span className="text-gray-500"> ({activity.type})</span>
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-purple-100 pb-3">
              <CardTitle className="text-purple-700 text-lg">Registered Users</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-1">
                {borrowers.map((borrower) => (
                  <div 
                    key={borrower.id} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 border-b last:border-0 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center text-purple-700 font-medium">
                        {borrower.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{borrower.name}</p>
                        <p className="text-xs text-gray-500">{borrower.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        <span className="font-medium text-purple-700">{borrower.borrowed}</span> items borrowed
                      </p>
                      {borrower.overdue > 0 && (
                        <p className="text-xs text-red-500">
                          {borrower.overdue} overdue
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
