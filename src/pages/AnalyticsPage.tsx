import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Database, Clipboard, Users, BookMarked, GraduationCap, Award } from "lucide-react";

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("books");

  // Mock data for books analytics
  const bookData = [
    { name: 'Jan', borrowed: 45, returned: 30, overdue: 15 },
    { name: 'Feb', borrowed: 52, returned: 45, overdue: 7 },
    { name: 'Mar', borrowed: 38, returned: 20, overdue: 18 },
    { name: 'Apr', borrowed: 65, returned: 58, overdue: 7 },
    { name: 'May', borrowed: 48, returned: 40, overdue: 8 },
    { name: 'Jun', borrowed: 55, returned: 45, overdue: 10 },
  ];

  const bookCategoryData = [
    { name: 'Computer Science', value: 45, color: '#8884d8' },
    { name: 'Engineering', value: 30, color: '#82ca9d' },
    { name: 'Mathematics', value: 15, color: '#ffc658' },
    { name: 'Physics', value: 25, color: '#ff8042' },
    { name: 'Chemistry', value: 18, color: '#0088FE' },
  ];

  // Mock data for equipment ICS analytics
  const equipmentICSData = [
    { name: 'Jan', borrowed: 20, returned: 15, overdue: 5 },
    { name: 'Feb', borrowed: 25, returned: 20, overdue: 5 },
    { name: 'Mar', borrowed: 30, returned: 28, overdue: 2 },
    { name: 'Apr', borrowed: 22, returned: 18, overdue: 4 },
    { name: 'May', borrowed: 28, returned: 25, overdue: 3 },
    { name: 'Jun', borrowed: 32, returned: 30, overdue: 2 },
  ];

  const equipmentICSCategoryData = [
    { name: 'Computers', value: 35, color: '#8884d8' },
    { name: 'Lab Equipment', value: 25, color: '#82ca9d' },
    { name: 'Audio/Visual', value: 20, color: '#ffc658' },
    { name: 'Electronics', value: 15, color: '#ff8042' },
    { name: 'Others', value: 5, color: '#0088FE' },
  ];

  // Mock data for equipment PAR analytics
  const equipmentPARData = [
    { name: 'Jan', borrowed: 15, returned: 12, overdue: 3 },
    { name: 'Feb', borrowed: 18, returned: 15, overdue: 3 },
    { name: 'Mar', borrowed: 22, returned: 20, overdue: 2 },
    { name: 'Apr', borrowed: 16, returned: 14, overdue: 2 },
    { name: 'May', borrowed: 20, returned: 18, overdue: 2 },
    { name: 'Jun', borrowed: 25, returned: 22, overdue: 3 },
  ];

  const equipmentPARCategoryData = [
    { name: 'Office Equipment', value: 40, color: '#8884d8' },
    { name: 'Furniture', value: 30, color: '#82ca9d' },
    { name: 'Fixtures', value: 15, color: '#ffc658' },
    { name: 'Tools', value: 10, color: '#ff8042' },
    { name: 'Others', value: 5, color: '#0088FE' },
  ];

  // Mock data for projects
  const projectData = [
    { name: '2020', research: 12, extension: 8 },
    { name: '2021', research: 15, extension: 10 },
    { name: '2022', research: 18, extension: 14 },
    { name: '2023', research: 22, extension: 16 },
    { name: '2024', research: 25, extension: 20 },
    { name: '2025', research: 30, extension: 24 },
  ];

  const projectStatusData = [
    { name: 'Completed', value: 45, color: '#4CAF50' },
    { name: 'Ongoing', value: 30, color: '#2196F3' },
    { name: 'Planned', value: 15, color: '#FFC107' },
    { name: 'On Hold', value: 10, color: '#FF5722' },
  ];
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-800 dark:text-blue-400">Analytics Dashboard</h1>
        </div>

        <Tabs defaultValue="books" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Books</span>
            </TabsTrigger>
            <TabsTrigger value="equipmentICS" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Equipment ICS</span>
            </TabsTrigger>
            <TabsTrigger value="equipmentPAR" className="flex items-center gap-2">
              <Clipboard className="h-4 w-4" />
              <span>Equipment PAR</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
          </TabsList>

          {/* Books Analytics */}
          <TabsContent value="books" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Books</CardTitle>
                  <CardDescription>Books in inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 dark:text-blue-400 flex items-center gap-3">
                    <BookOpen className="h-8 w-8" /> 450
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Currently Borrowed</CardTitle>
                  <CardDescription>Books out on loan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600 flex items-center gap-3">
                    <Users className="h-8 w-8" /> 78
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overdue Books</CardTitle>
                  <CardDescription>Books past due date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 flex items-center gap-3">
                    <BookOpen className="h-8 w-8" /> 23
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Transactions Monthly</CardTitle>
                  <CardDescription>Borrowed, returned, and overdue books</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={bookData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="borrowed" fill="#8884d8" name="Borrowed" />
                        <Bar dataKey="returned" fill="#82ca9d" name="Returned" />
                        <Bar dataKey="overdue" fill="#ff8042" name="Overdue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Book Categories</CardTitle>
                  <CardDescription>Distribution by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bookCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {bookCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Equipment ICS Analytics */}
          <TabsContent value="equipmentICS" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total ICS Equipment</CardTitle>
                  <CardDescription>Equipment in inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 dark:text-blue-400 flex items-center gap-3">
                    <Database className="h-8 w-8" /> 250
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Currently Borrowed</CardTitle>
                  <CardDescription>Equipment out on loan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600 flex items-center gap-3">
                    <Users className="h-8 w-8" /> 42
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overdue Equipment</CardTitle>
                  <CardDescription>Equipment past due date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 flex items-center gap-3">
                    <Database className="h-8 w-8" /> 12
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment ICS Transactions Monthly</CardTitle>
                  <CardDescription>Borrowed, returned, and overdue equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={equipmentICSData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="borrowed" fill="#8884d8" name="Borrowed" />
                        <Bar dataKey="returned" fill="#82ca9d" name="Returned" />
                        <Bar dataKey="overdue" fill="#ff8042" name="Overdue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Equipment ICS Categories</CardTitle>
                  <CardDescription>Distribution by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={equipmentICSCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {equipmentICSCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Equipment PAR Analytics */}
          <TabsContent value="equipmentPAR" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total PAR Equipment</CardTitle>
                  <CardDescription>Equipment in inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 dark:text-blue-400 flex items-center gap-3">
                    <Clipboard className="h-8 w-8" /> 180
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Currently Borrowed</CardTitle>
                  <CardDescription>Equipment out on loan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600 flex items-center gap-3">
                    <Users className="h-8 w-8" /> 35
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overdue Equipment</CardTitle>
                  <CardDescription>Equipment past due date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 flex items-center gap-3">
                    <Clipboard className="h-8 w-8" /> 8
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment PAR Transactions Monthly</CardTitle>
                  <CardDescription>Borrowed, returned, and overdue equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={equipmentPARData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="borrowed" fill="#8884d8" name="Borrowed" />
                        <Bar dataKey="returned" fill="#82ca9d" name="Returned" />
                        <Bar dataKey="overdue" fill="#ff8042" name="Overdue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Equipment PAR Categories</CardTitle>
                  <CardDescription>Distribution by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={equipmentPARCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {equipmentPARCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Analytics */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Projects</CardTitle>
                  <CardDescription>All research and extension projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 dark:text-blue-400 flex items-center gap-3">
                    <BookMarked className="h-8 w-8" /> 122
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Research Projects</CardTitle>
                  <CardDescription>Total research projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 flex items-center gap-3">
                    <GraduationCap className="h-8 w-8" /> 75
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Extension Projects</CardTitle>
                  <CardDescription>Total extension projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 flex items-center gap-3">
                    <Award className="h-8 w-8" /> 47
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Projects Yearly Distribution</CardTitle>
                  <CardDescription>Research vs Extension projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={projectData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="research" fill="#3b82f6" name="Research" />
                        <Bar dataKey="extension" fill="#22c55e" name="Extension" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                  <CardDescription>Status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={projectStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {projectStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
