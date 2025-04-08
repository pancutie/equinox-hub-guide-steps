
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Check, Database, Clipboard, BarChart, Award, GraduationCap } from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for Books analytics
const booksData = {
  totalBooks: 181,
  availableBooks: 124,
  borrowedBooks: 45,
  overdueBooks: 12
};

const monthlyBooksData = [
  { month: 'Jan', borrowed: 32, returned: 28 },
  { month: 'Feb', borrowed: 28, returned: 25 },
  { month: 'Mar', borrowed: 34, returned: 31 },
  { month: 'Apr', borrowed: 39, returned: 37 },
  { month: 'May', borrowed: 45, returned: 40 },
  { month: 'Jun', borrowed: 41, returned: 38 },
];

const bookStatusData = [
  { name: 'Available', value: booksData.availableBooks, color: '#8b5cf6' },
  { name: 'Borrowed', value: booksData.borrowedBooks, color: '#10b981' },
  { name: 'Overdue', value: booksData.overdueBooks, color: '#ef4444' },
];

// Mock data for Equipment analytics
const equipmentData = {
  totalEquipmentICS: 63,
  availableEquipmentICS: 45,
  borrowedEquipmentICS: 15,
  overdueEquipmentICS: 3,
  totalEquipmentPAR: 32,
  availableEquipmentPAR: 22,
  borrowedEquipmentPAR: 8,
  overdueEquipmentPAR: 2
};

const monthlyEquipmentData = [
  { month: 'Jan', borrowedICS: 18, returnedICS: 16, borrowedPAR: 12, returnedPAR: 10 },
  { month: 'Feb', borrowedICS: 15, returnedICS: 14, borrowedPAR: 10, returnedPAR: 9 },
  { month: 'Mar', borrowedICS: 21, returnedICS: 19, borrowedPAR: 14, returnedPAR: 13 },
  { month: 'Apr', borrowedICS: 25, returnedICS: 23, borrowedPAR: 16, returnedPAR: 14 },
  { month: 'May', borrowedICS: 23, returnedICS: 20, borrowedPAR: 15, returnedPAR: 13 },
  { month: 'Jun', borrowedICS: 19, returnedICS: 17, borrowedPAR: 13, returnedPAR: 12 },
];

const equipmentStatusDataICS = [
  { name: 'Available', value: equipmentData.availableEquipmentICS, color: '#8b5cf6' },
  { name: 'Borrowed', value: equipmentData.borrowedEquipmentICS, color: '#10b981' },
  { name: 'Overdue', value: equipmentData.overdueEquipmentICS, color: '#ef4444' },
];

const equipmentStatusDataPAR = [
  { name: 'Available', value: equipmentData.availableEquipmentPAR, color: '#8b5cf6' },
  { name: 'Borrowed', value: equipmentData.borrowedEquipmentPAR, color: '#10b981' },
  { name: 'Overdue', value: equipmentData.overdueEquipmentPAR, color: '#ef4444' },
];

// Mock data for Projects analytics
const projectsData = {
  totalResearchProjects: 24,
  totalExtensionProjects: 18,
  totalResearchActivities: 35,
  totalExtensionActivities: 42,
  completedResearchProjects: 15,
  ongoingResearchProjects: 9,
  completedExtensionProjects: 12,
  ongoingExtensionProjects: 6,
  completedResearchActivities: 28,
  ongoingResearchActivities: 7,
  completedExtensionActivities: 30,
  ongoingExtensionActivities: 12
};

// Yearly projects data
const yearlyProjectsData = [
  { year: '2020', research: 5, extension: 4, researchActivities: 8, extensionActivities: 10 },
  { year: '2021', research: 6, extension: 5, researchActivities: 10, extensionActivities: 8 },
  { year: '2022', research: 4, extension: 3, researchActivities: 7, extensionActivities: 12 },
  { year: '2023', research: 5, extension: 3, researchActivities: 5, extensionActivities: 8 },
  { year: '2024', research: 4, extension: 3, researchActivities: 5, extensionActivities: 4 },
];

const researchStatusData = [
  { name: 'Completed', value: projectsData.completedResearchProjects, color: '#10b981' },
  { name: 'Ongoing', value: projectsData.ongoingResearchProjects, color: '#8b5cf6' },
];

const extensionStatusData = [
  { name: 'Completed', value: projectsData.completedExtensionProjects, color: '#10b981' },
  { name: 'Ongoing', value: projectsData.ongoingExtensionProjects, color: '#8b5cf6' },
];

const AnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Analytics</h1>
      </div>
      
      <Tabs defaultValue="books" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="books" className="text-sm sm:text-base">Books Analytics</TabsTrigger>
          <TabsTrigger value="equipment" className="text-sm sm:text-base">Equipment Analytics</TabsTrigger>
          <TabsTrigger value="projects" className="text-sm sm:text-base">Projects Analytics</TabsTrigger>
        </TabsList>

        {/* Books Analytics Content */}
        <TabsContent value="books">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <Book size={18} />
                    Total Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{booksData.totalBooks}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Book size={18} />
                    Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{booksData.availableBooks}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Check size={18} />
                    Borrowed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{booksData.borrowedBooks}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-700 dark:text-red-400">
                    <Book size={18} />
                    Overdue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{booksData.overdueBooks}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <BarChart size={18} />
                    Monthly Book Borrowing Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyBooksData}
                        margin={{ top: 10, right: 20, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" />
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
                        <Line type="monotone" dataKey="borrowed" name="Books Borrowed" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="returned" name="Books Returned" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300">Books Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="70%" height="100%">
                      <PieChart>
                        <Pie
                          data={bookStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {bookStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} books`, name]}
                          contentStyle={{ 
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--foreground)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Equipment Analytics Content */}
        <TabsContent value="equipment">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">Equipment ICS</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                      <Database size={18} />
                      Total ICS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{equipmentData.totalEquipmentICS}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Database size={18} />
                      Available
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{equipmentData.availableEquipmentICS}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <Check size={18} />
                      Borrowed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{equipmentData.borrowedEquipmentICS}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-700 dark:text-red-400">
                      <Database size={18} />
                      Overdue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{equipmentData.overdueEquipmentICS}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">Equipment PAR</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                      <Clipboard size={18} />
                      Total PAR
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{equipmentData.totalEquipmentPAR}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Clipboard size={18} />
                      Available
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{equipmentData.availableEquipmentPAR}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <Check size={18} />
                      Borrowed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{equipmentData.borrowedEquipmentPAR}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-700 dark:text-red-400">
                      <Clipboard size={18} />
                      Overdue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{equipmentData.overdueEquipmentPAR}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <BarChart size={18} />
                    Monthly Equipment Borrowing Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyEquipmentData}
                        margin={{ top: 10, right: 20, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" />
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
                        <Line type="monotone" dataKey="borrowedICS" name="ICS Borrowed" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="returnedICS" name="ICS Returned" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="borrowedPAR" name="PAR Borrowed" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="returnedPAR" name="PAR Returned" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                    <CardTitle className="text-purple-700 dark:text-purple-300">Equipment Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-center text-sm font-medium mb-2 dark:text-gray-300">ICS Equipment</h4>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={equipmentStatusDataICS}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {equipmentStatusDataICS.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value, name) => [`${value} equipment`, name]}
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
                      </div>
                      
                      <div>
                        <h4 className="text-center text-sm font-medium mb-2 dark:text-gray-300">PAR Equipment</h4>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={equipmentStatusDataPAR}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {equipmentStatusDataPAR.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value, name) => [`${value} equipment`, name]}
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Projects Analytics Content */}
        <TabsContent value="projects">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <Award size={18} />
                    Research Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{projectsData.totalResearchProjects}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <GraduationCap size={18} />
                    Extension Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{projectsData.totalExtensionProjects}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Check size={18} />
                    Completed Research
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{projectsData.completedResearchProjects}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Check size={18} />
                    Completed Extension
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{projectsData.completedExtensionProjects}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <BarChart size={18} />
                    Yearly Projects Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={yearlyProjectsData}
                        margin={{ top: 10, right: 20, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" />
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

              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900">
                  <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                    <CardTitle className="text-purple-700 dark:text-purple-300">Project Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-center text-sm font-medium mb-2 dark:text-gray-300">Research Projects</h4>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={researchStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {researchStatusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value, name) => [`${value} projects`, name]}
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
                      </div>
                      
                      <div>
                        <h4 className="text-center text-sm font-medium mb-2 dark:text-gray-300">Extension Projects</h4>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={extensionStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {extensionStatusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value, name) => [`${value} projects`, name]}
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AnalyticsPage;
