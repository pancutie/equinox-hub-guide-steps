
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data - replace with actual data in production
const bookData = [
  { name: 'Jan', borrowed: 65, overdue: 12, returned: 53 },
  { name: 'Feb', borrowed: 45, overdue: 8, returned: 37 },
  { name: 'Mar', borrowed: 58, overdue: 10, returned: 48 },
  { name: 'Apr', borrowed: 70, overdue: 15, returned: 55 },
  { name: 'May', borrowed: 63, overdue: 9, returned: 54 },
  { name: 'Jun', borrowed: 55, overdue: 11, returned: 44 }
];

const equipmentData = [
  { name: 'Jan', borrowed: 45, overdue: 8, returned: 37 },
  { name: 'Feb', borrowed: 38, overdue: 5, returned: 33 },
  { name: 'Mar', borrowed: 42, overdue: 7, returned: 35 },
  { name: 'Apr', borrowed: 50, overdue: 10, returned: 40 },
  { name: 'May', borrowed: 48, overdue: 6, returned: 42 },
  { name: 'Jun', borrowed: 52, overdue: 9, returned: 43 }
];

const projectStatusData = [
  { name: 'Completed', value: 35, color: '#10b981' },
  { name: 'In Progress', value: 45, color: '#3b82f6' },
  { name: 'Planning', value: 20, color: '#8b5cf6' }
];

const researchData = [
  { year: '2020', completed: 12, ongoing: 5 },
  { year: '2021', completed: 15, ongoing: 7 },
  { year: '2022', completed: 18, ongoing: 9 },
  { year: '2023', completed: 22, ongoing: 12 },
  { year: '2024', completed: 14, ongoing: 18 }
];

const extensionData = [
  { year: '2020', completed: 10, ongoing: 4 },
  { year: '2021', completed: 12, ongoing: 5 },
  { year: '2022', completed: 15, ongoing: 6 },
  { year: '2023', completed: 18, ongoing: 8 },
  { year: '2024', completed: 11, ongoing: 14 }
];

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("books");
  
  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f43f5e', '#f97316'];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        
        <Tabs defaultValue="books" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          {/* Books Analytics */}
          <TabsContent value="books" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Borrowing Trends</CardTitle>
                  <CardDescription>Monthly statistics on book borrowing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="borrowed" fill="#8b5cf6" name="Borrowed" />
                        <Bar dataKey="overdue" fill="#f43f5e" name="Overdue" />
                        <Bar dataKey="returned" fill="#10b981" name="Returned" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Borrowed Books</CardTitle>
                  <CardDescription>Most popular books in the library</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Introduction to Research", count: 42 },
                      { title: "Advanced Statistics", count: 38 },
                      { title: "Research Methodology", count: 35 },
                      { title: "Data Analysis Techniques", count: 31 },
                      { title: "Scientific Writing", count: 28 }
                    ].map((book, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{index + 1}.</span>
                          <span>{book.title}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded font-medium">
                            {book.count} times
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Equipment Analytics */}
          <TabsContent value="equipment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Borrowing Trends</CardTitle>
                  <CardDescription>Monthly statistics on equipment borrowing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={equipmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="borrowed" fill="#3b82f6" name="Borrowed" />
                        <Bar dataKey="overdue" fill="#f97316" name="Overdue" />
                        <Bar dataKey="returned" fill="#10b981" name="Returned" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Borrowed Equipment</CardTitle>
                  <CardDescription>Most frequently borrowed equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Projector", count: 35 },
                      { title: "Laptop", count: 32 },
                      { title: "Digital Camera", count: 28 },
                      { title: "Audio Recorder", count: 25 },
                      { title: "Microphone Set", count: 22 }
                    ].map((equipment, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{index + 1}.</span>
                          <span>{equipment.title}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded font-medium">
                            {equipment.count} times
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Projects Analytics */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Research Projects Timeline</CardTitle>
                  <CardDescription>Annual research project statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={researchData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#8b5cf6" name="Completed" />
                        <Bar dataKey="ongoing" fill="#3b82f6" name="Ongoing" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                  <CardDescription>Current status of all projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
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
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {projectStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Extension Projects Timeline</CardTitle>
                <CardDescription>Annual extension project statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={extensionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#f43f5e" name="Completed" />
                      <Bar dataKey="ongoing" fill="#f97316" name="Ongoing" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
