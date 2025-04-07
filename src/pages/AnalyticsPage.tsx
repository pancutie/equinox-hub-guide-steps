
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Database, Clipboard, Users, BookMarked, GraduationCap, Award } from "lucide-react";

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("books");

  // Sample data for books
  const booksData = [
    { name: 'Jan', borrowed: 40, returned: 24 },
    { name: 'Feb', borrowed: 30, returned: 13 },
    { name: 'Mar', borrowed: 20, returned: 8 },
    { name: 'Apr', borrowed: 27, returned: 19 },
    { name: 'May', borrowed: 18, returned: 15 },
    { name: 'Jun', borrowed: 23, returned: 12 },
  ];

  const bookCategoriesData = [
    { name: 'Science', value: 400 },
    { name: 'History', value: 300 },
    { name: 'Math', value: 300 },
    { name: 'Literature', value: 200 },
    { name: 'Computer', value: 500 },
  ];

  // Sample data for equipment
  const equipmentICSData = [
    { name: 'Jan', borrowed: 15, returned: 10 },
    { name: 'Feb', borrowed: 20, returned: 8 },
    { name: 'Mar', borrowed: 25, returned: 15 },
    { name: 'Apr', borrowed: 18, returned: 12 },
    { name: 'May', borrowed: 22, returned: 18 },
    { name: 'Jun', borrowed: 14, returned: 9 },
  ];
  
  const equipmentPARData = [
    { name: 'Jan', borrowed: 8, returned: 5 },
    { name: 'Feb', borrowed: 12, returned: 6 },
    { name: 'Mar', borrowed: 14, returned: 9 },
    { name: 'Apr', borrowed: 10, returned: 7 },
    { name: 'May', borrowed: 16, returned: 11 },
    { name: 'Jun', borrowed: 7, returned: 4 },
  ];
  
  const equipmentCategoriesData = [
    { name: 'Computer', value: 300 },
    { name: 'Audio/Video', value: 200 },
    { name: 'Lab', value: 250 },
    { name: 'Office', value: 150 },
    { name: 'Other', value: 100 },
  ];

  // Sample data for projects
  const projectsData = [
    { name: '2021', research: 30, extension: 20 },
    { name: '2022', research: 40, extension: 25 },
    { name: '2023', research: 35, extension: 30 },
    { name: '2024', research: 50, extension: 40 },
    { name: '2025', research: 45, extension: 35 },
  ];

  const projectStatusData = [
    { name: 'Completed', value: 40 },
    { name: 'Ongoing', value: 30 },
    { name: 'Planning', value: 20 },
    { name: 'Cancelled', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        </div>

        <Tabs defaultValue="books" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="books" className="flex gap-2 items-center">
                <BookOpen size={16} /> Books
              </TabsTrigger>
              <TabsTrigger value="equipment" className="flex gap-2 items-center">
                <Database size={16} /> Equipment
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex gap-2 items-center">
                <GraduationCap size={16} /> Projects
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Books Analytics */}
          <TabsContent value="books" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                  <CardDescription>Overall book collection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">1,728</div>
                    <BookMarked size={24} className="text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Currently Borrowed</CardTitle>
                  <CardDescription>Books checked out</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">243</div>
                    <Database size={24} className="text-amber-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
                  <CardDescription>Past return date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">37</div>
                    <AlertTriangle size={24} className="text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Borrowing Trends</CardTitle>
                  <CardDescription>Books borrowed vs returned over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={booksData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="borrowed" fill="#8884d8" name="Borrowed" />
                      <Bar dataKey="returned" fill="#82ca9d" name="Returned" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Book Categories</CardTitle>
                  <CardDescription>Distribution by subject</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookCategoriesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bookCategoriesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Equipment Analytics */}
          <TabsContent value="equipment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Equipment</CardTitle>
                  <CardDescription>All equipment items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">457</div>
                    <Database size={24} className="text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">ICS Items</CardTitle>
                  <CardDescription>Total ICS equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">215</div>
                    <Database size={24} className="text-indigo-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">PAR Items</CardTitle>
                  <CardDescription>Total PAR equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">242</div>
                    <Clipboard size={24} className="text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ICS Equipment Borrowing</CardTitle>
                  <CardDescription>ICS items borrowed vs returned over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={equipmentICSData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="borrowed" fill="#8884d8" name="Borrowed" />
                      <Bar dataKey="returned" fill="#82ca9d" name="Returned" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>PAR Equipment Borrowing</CardTitle>
                  <CardDescription>PAR items borrowed vs returned over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={equipmentPARData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="borrowed" fill="#8844d8" name="Borrowed" />
                      <Bar dataKey="returned" fill="#42ca9d" name="Returned" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Equipment Categories</CardTitle>
                  <CardDescription>Distribution by type</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={equipmentCategoriesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {equipmentCategoriesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Analytics */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <CardDescription>All research and extension</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">87</div>
                    <GraduationCap size={24} className="text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Research Projects</CardTitle>
                  <CardDescription>Academic research initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">42</div>
                    <GraduationCap size={24} className="text-indigo-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Extension Projects</CardTitle>
                  <CardDescription>Community outreach</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">45</div>
                    <Award size={24} className="text-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Projects by Year</CardTitle>
                  <CardDescription>Research vs Extension projects</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="research" fill="#8884d8" name="Research" />
                      <Bar dataKey="extension" fill="#82ca9d" name="Extension" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                  <CardDescription>Current completion status</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
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
