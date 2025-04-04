
import MainLayout from "@/components/layout/MainLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Book, Check, Database, AlertTriangle, BookOpen, Users, BarChart } from "lucide-react";
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

// Mock data - in a real app, this would come from a database
const mockData = {
  availableBooks: 124,
  borrowedBooks: 45,
  overdueBooks: 12,
  availableEquipment: 67,
  borrowedEquipment: 23,
  overdueEquipment: 5,
  totalBooks: 181,
  totalEquipment: 95,
  totalUsers: 152
};

// Monthly borrowing data for chart
const borrowingData = [
  { month: 'Jan', books: 32, equipment: 18 },
  { month: 'Feb', books: 28, equipment: 15 },
  { month: 'Mar', books: 34, equipment: 21 },
  { month: 'Apr', books: 39, equipment: 25 },
  { month: 'May', books: 45, equipment: 23 },
  { month: 'Jun', books: 41, equipment: 19 },
];

// Pie chart data
const bookStatusData = [
  { name: 'Available', value: mockData.availableBooks, color: '#8b5cf6' },
  { name: 'Borrowed', value: mockData.borrowedBooks, color: '#10b981' },
  { name: 'Overdue', value: mockData.overdueBooks, color: '#ef4444' },
];

const equipmentStatusData = [
  { name: 'Available', value: mockData.availableEquipment, color: '#9333ea' },
  { name: 'Borrowed', value: mockData.borrowedEquipment, color: '#14b8a6' },
  { name: 'Overdue', value: mockData.overdueEquipment, color: '#f97316' },
];

// Recent activity
const recentActivities = [
  { id: 1, user: "Maria Santos", action: "borrowed", item: "Projector", type: "Equipment", time: "3 hours ago" },
  { id: 2, user: "Juan Dela Cruz", action: "returned", item: "Advanced Web Development", type: "Book", time: "5 hours ago" },
  { id: 3, user: "Carlos Tan", action: "borrowed", item: "Software Engineering", type: "Book", time: "1 day ago" },
  { id: 4, user: "Ana Gonzales", action: "returned", item: "Tablet", type: "Equipment", time: "2 days ago" },
  { id: 5, user: "Sofia Lim", action: "borrowed", item: "3D Printer", type: "Equipment", time: "3 days ago" },
];

const Index = () => {
  const navigate = useNavigate();

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
            count={mockData.totalEquipment}
            icon={<Database size={20} />}
            linkTo="/equipment"
            bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
            textColor="text-white"
          />
          
          <DashboardCard
            title="Registered Users"
            count={mockData.totalUsers}
            icon={<Users size={20} />}
            linkTo="/users"
            bgColor="bg-gradient-to-br from-violet-500 to-violet-600"
            textColor="text-white"
          />
        </div>

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
          <h3 className="text-lg font-semibold mb-3 text-purple-800">Equipment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Available Equipment"
              count={mockData.availableEquipment}
              icon={<Database size={20} />}
              linkTo="/reports/available-equipment"
              bgColor="bg-gradient-to-br from-violet-400 to-violet-500"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Borrowed Equipment"
              count={mockData.borrowedEquipment}
              icon={<Check size={20} />}
              linkTo="/reports/borrowed-equipment"
              bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Overdue Equipment"
              count={mockData.overdueEquipment}
              icon={<AlertTriangle size={20} />}
              linkTo="/reports/overdue-equipment"
              bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
              textColor="text-white"
            />
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-md border border-purple-100">
            <CardHeader className="border-b border-purple-50 pb-3">
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
                    <Bar dataKey="equipment" name="Equipment" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white shadow-md border border-purple-100">
              <CardHeader className="border-b border-purple-50 pb-3">
                <CardTitle className="text-purple-700 text-lg">Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1">Books</h4>
                    <div className="h-[140px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bookStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={50}
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
                    <div className="flex justify-center gap-4 mt-1">
                      {bookStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1">Equipment</h4>
                    <div className="h-[140px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={equipmentStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={50}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {equipmentStatusData.map((entry, index) => (
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
                    <div className="flex justify-center gap-4 mt-1">
                      {equipmentStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
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
        
        <Card className="bg-white shadow-md border border-purple-100">
          <CardHeader className="border-b border-purple-50 pb-3">
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
      </div>
    </MainLayout>
  );
};

export default Index;
