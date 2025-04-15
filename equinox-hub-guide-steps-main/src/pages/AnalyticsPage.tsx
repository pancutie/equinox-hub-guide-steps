
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Check, Database, Clipboard, BarChart as BarChartIcon, Award, GraduationCap } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { overdueBooks, overdueEquipment } from '@/pages/Index';

// Mock data for book analytics
const bookBorrowingTrend = [
  { month: 'Jan', borrowed: 42, returned: 38, overdue: 4 },
  { month: 'Feb', borrowed: 38, returned: 35, overdue: 3 },
  { month: 'Mar', borrowed: 45, returned: 40, overdue: 5 },
  { month: 'Apr', borrowed: 52, returned: 46, overdue: 6 },
  { month: 'May', borrowed: 48, returned: 45, overdue: 3 },
  { month: 'Jun', borrowed: 55, returned: 50, overdue: 5 },
];

const bookCategoriesData = [
  { category: 'Computer Science', count: 45 },
  { category: 'Mathematics', count: 32 },
  { category: 'Engineering', count: 28 },
  { category: 'Literature', count: 20 },
  { category: 'Physics', count: 18 },
  { category: 'Other', count: 38 },
];

const bookStatusData = [
  { name: 'Available', value: 124, color: '#8b5cf6' },
  { name: 'Borrowed', value: 45, color: '#10b981' },
  { name: 'Overdue', value: 12, color: '#ef4444' },
];

// Mock data for equipment analytics
const equipmentBorrowingTrend = [
  { month: 'Jan', borrowed: 28, returned: 25, overdue: 3 },
  { month: 'Feb', borrowed: 25, returned: 23, overdue: 2 },
  { month: 'Mar', borrowed: 30, returned: 27, overdue: 3 },
  { month: 'Apr', borrowed: 35, returned: 31, overdue: 4 },
  { month: 'May', borrowed: 30, returned: 28, overdue: 2 },
  { month: 'Jun', borrowed: 38, returned: 35, overdue: 3 },
];

const equipmentTypesData = [
  { type: 'Laptops', count: 25 },
  { type: 'Projectors', count: 18 },
  { type: 'Tablets', count: 15 },
  { type: 'Whiteboards', count: 12 },
  { type: 'Printers', count: 10 },
  { type: 'Other', count: 15 },
];

const equipmentStatusData = [
  { name: 'Available', value: 67, color: '#9333ea' },
  { name: 'Borrowed', value: 23, color: '#14b8a6' },
  { name: 'Overdue', value: 5, color: '#f97316' },
];

// Mock data for project analytics
const projectYearlyData = [
  { year: '2020', research: 5, extension: 4, researchActivities: 8, extensionActivities: 10 },
  { year: '2021', research: 6, extension: 5, researchActivities: 10, extensionActivities: 8 },
  { year: '2022', research: 4, extension: 3, researchActivities: 7, extensionActivities: 12 },
  { year: '2023', research: 5, extension: 3, researchActivities: 5, extensionActivities: 8 },
  { year: '2024', research: 4, extension: 3, researchActivities: 5, extensionActivities: 4 },
];

const projectStatusData = [
  { name: 'Completed', value: 27, color: '#10b981' },
  { name: 'Ongoing', value: 15, color: '#8b5cf6' },
];

const AnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Analytics</h1>
      </div>

      <Tabs defaultValue="books" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full mb-4 md:w-[400px]">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        {/* BOOKS ANALYTICS */}
        <TabsContent value="books">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-purple-700 dark:text-purple-300">Total Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
                    <span className="text-2xl font-bold">{bookStatusData.reduce((sum, item) => sum + item.value, 0)}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-700 dark:text-green-300">Borrowed Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    <span className="text-2xl font-bold">{bookStatusData.find(item => item.name === 'Borrowed')?.value}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-red-700 dark:text-red-300">Overdue Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                    <span className="text-2xl font-bold">{overdueBooks.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <BarChartIcon size={18} />
                    Monthly Book Borrowing Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={bookBorrowingTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
                        <XAxis dataKey="month" className="dark:text-gray-300" />
                        <YAxis className="dark:text-gray-300" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="borrowed" 
                          stroke="#8b5cf6" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="returned" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="overdue" 
                          stroke="#ef4444" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300">Books by Category</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={bookCategoriesData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
                        <XAxis type="number" className="dark:text-gray-300" />
                        <YAxis 
                          dataKey="category" 
                          type="category" 
                          width={100} 
                          className="dark:text-gray-300"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="count" 
                          name="Number of Books" 
                          fill="#8b5cf6" 
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300">Book Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex justify-center">
                  <div className="h-[250px] w-full max-w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bookStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {bookStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} books`]}
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300">Latest Borrowing Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Most borrowed category</span>
                      <span className="font-medium">Computer Science</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Average borrowing duration</span>
                      <span className="font-medium">14 days</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Most active borrowers</span>
                      <span className="font-medium">Students</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Overdue rate</span>
                      <span className="font-medium text-red-600 dark:text-red-400">8.2%</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Average usage per book</span>
                      <span className="font-medium">3.5 times/year</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* EQUIPMENT ANALYTICS */}
        <TabsContent value="equipment">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-purple-700 dark:text-purple-300">Total Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
                    <span className="text-2xl font-bold">{equipmentStatusData.reduce((sum, item) => sum + item.value, 0)}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-700 dark:text-green-300">Borrowed Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    <span className="text-2xl font-bold">{equipmentStatusData.find(item => item.name === 'Borrowed')?.value}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-red-700 dark:text-red-300">Overdue Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                    <span className="text-2xl font-bold">{overdueEquipment.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <BarChartIcon size={18} />
                    Monthly Equipment Borrowing Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={equipmentBorrowingTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
                        <XAxis dataKey="month" className="dark:text-gray-300" />
                        <YAxis className="dark:text-gray-300" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="borrowed" 
                          stroke="#9333ea" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="returned" 
                          stroke="#14b8a6" 
                          strokeWidth={2} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="overdue" 
                          stroke="#f97316" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300">Equipment by Type</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={equipmentTypesData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
                        <XAxis type="number" className="dark:text-gray-300" />
                        <YAxis 
                          dataKey="type" 
                          type="category" 
                          width={100}
                          className="dark:text-gray-300"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="count" 
                          name="Number of Items" 
                          fill="#9333ea" 
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300">Equipment Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex justify-center">
                  <div className="h-[250px] w-full max-w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={equipmentStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {equipmentStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} items`]}
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300">Latest Equipment Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Most borrowed type</span>
                      <span className="font-medium">Laptops</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Average borrowing duration</span>
                      <span className="font-medium">7 days</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Most active borrowers</span>
                      <span className="font-medium">Faculty</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Overdue rate</span>
                      <span className="font-medium text-red-600 dark:text-red-400">5.3%</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span>Equipment utilization</span>
                      <span className="font-medium">74%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* PROJECTS ANALYTICS */}
        <TabsContent value="projects">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-purple-700 dark:text-purple-300">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
                    <span className="text-2xl font-bold">{projectStatusData.reduce((sum, item) => sum + item.value, 0)}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-700 dark:text-green-300">Completed Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    <span className="text-2xl font-bold">{projectStatusData.find(item => item.name === 'Completed')?.value}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Ongoing Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                    <span className="text-2xl font-bold">{projectStatusData.find(item => item.name === 'Ongoing')?.value}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <BarChartIcon size={18} />
                    Yearly Projects Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={projectYearlyData}
                        margin={{ top: 10, right: 20, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
                        <XAxis dataKey="year" className="dark:text-gray-300" />
                        <YAxis className="dark:text-gray-300" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Legend />
                        <Bar dataKey="research" name="Research Projects" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="extension" name="Extension Projects" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="researchActivities" name="Research Activities" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="extensionActivities" name="Extension Activities" fill="#a855f7" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300">Project Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex justify-center">
                  <div className="h-[250px] w-full max-w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={projectStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {projectStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} projects`]}
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
              <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                <CardTitle className="text-purple-700 dark:text-purple-300">Project Insights</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg">Research Projects</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span>Total Research Projects</span>
                        <span className="font-medium">24</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span>Completed</span>
                        <span className="font-medium text-green-600 dark:text-green-400">15</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span>Ongoing</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">9</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span>Completion Rate</span>
                        <span className="font-medium">62.5%</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg">Extension Projects</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span>Total Extension Projects</span>
                        <span className="font-medium">18</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span>Completed</span>
                        <span className="font-medium text-green-600 dark:text-green-400">12</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span>Ongoing</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">6</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span>Completion Rate</span>
                        <span className="font-medium">66.7%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AnalyticsPage;
