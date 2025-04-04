
import MainLayout from "@/components/layout/MainLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Book, Check, Database, AlertTriangle } from "lucide-react";

// Mock data - in a real app, this would come from a database
const mockData = {
  availableBooks: 124,
  borrowedBooks: 45,
  overdueBooks: 12,
  availableEquipment: 67,
  borrowedEquipment: 23,
  overdueEquipment: 5
};

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4">Books Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Available Books"
              count={mockData.availableBooks}
              icon={<Book size={24} />}
              linkTo="/reports/available-books"
              bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
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
          <h3 className="text-xl font-semibold mb-4">Equipment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Available Equipment"
              count={mockData.availableEquipment}
              icon={<Database size={24} />}
              linkTo="/reports/available-equipment"
              bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
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
        
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 border-b last:border-0">
                <div>
                  <p className="font-medium">Student {Math.floor(Math.random() * 100) + 1000}</p>
                  <p className="text-sm text-gray-500">Borrowed {Math.random() > 0.5 ? 'Book' : 'Equipment'} #{Math.floor(Math.random() * 50) + 100}</p>
                </div>
                <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
