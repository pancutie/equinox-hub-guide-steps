
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
  { name: 'Available', value: mockData.availableBooks, color: '#3b82f6' },
  { name: 'Borrowed', value: mockData.borrowedBooks, color: '#10b981' },
  { name: 'Overdue', value: mockData.overdueBooks, color: '#ef4444' },
];

const equipmentStatusData = [
  { name: 'Available', value: mockData.availableEquipment, color: '#8b5cf6' },
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
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Books"
            count={mockData.totalBooks}
            icon={<BookOpen size={24} />}
            linkTo="/books"
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            textColor="text-white"
          />
          
          <DashboardCard
            title="Total Equipment"
            count={mockData.totalEquipment}
            icon={<Database size={24} />}
            linkTo="/equipment"
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            textColor="text-white"
          />
          
          <DashboardCard
            title="Registered Users"
            count={mockData.totalUsers}
            icon={<Users size={24} />}
            linkTo="/users"
            bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
            textColor="text-white"
          />
        </div>

        <section>
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Books Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Available Books"
              count={mockData.availableBooks}
              icon={<Book size={24} />}
              linkTo="/reports/available-books"
              bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Borrowed Books"
              count={mockData.borrowedBooks}
              icon={<Check size={24} />}
              linkTo="/reports/borrowed-books"
              bgColor="bg-gradient-to-br from-green-500 to-green-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Overdue Books"
              count={mockData.overdueBooks}
              icon={<AlertTriangle size={24} />}
              linkTo="/reports/overdue-books"
              bgColor="bg-gradient-to-br from-red-500 to-red-600"
              textColor="text-white"
            />
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-4 text-purple-800">Equipment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Available Equipment"
              count={mockData.availableEquipment}
              icon={<Database size={24} />}
              linkTo="/reports/available-equipment"
              bgColor="bg-gradient-to-br from-violet-500 to-violet-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Borrowed Equipment"
              count={mockData.borrowedEquipment}
              icon={<Check size={24} />}
              linkTo="/reports/borrowed-equipment"
              bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
              textColor="text-white"
            />
            
            <DashboardCard
              title="Overdue Equipment"
              count={mockData.overdueEquipment}
              icon={<AlertTriangle size={24} />}
              linkTo="/reports/overdue-equipment"
              bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
              textColor="text-white"
            />
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-md border">
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <BarChart size={20} />
                Monthly Borrowing Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={borrowingData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="books" name="Books" fill="#3b82f6" />
                    <Bar dataKey="equipment" name="Equipment" fill="#8b5cf6" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white shadow-md border">
              <CardHeader>
                <CardTitle className="text-blue-700">Book Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {bookStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {bookStatusData.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md border">
              <CardHeader>
                <CardTitle className="text-purple-700">Equipment Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={equipmentStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {equipmentStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {equipmentStatusData.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="bg-white shadow-md border">
          <CardHeader>
            <CardTitle className="text-blue-700">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border-b last:border-0"
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
