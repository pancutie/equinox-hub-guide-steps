
import MainLayout from "@/components/layout/MainLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Award, BookOpen, GraduationCap, FileText, Clipboard, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Mock data for the projects dashboard
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

// Project status data for pie charts
const researchStatusData = [
  { name: 'Completed', value: projectsData.completedResearchProjects, color: '#10b981' },
  { name: 'Ongoing', value: projectsData.ongoingResearchProjects, color: '#8b5cf6' },
];

const extensionStatusData = [
  { name: 'Completed', value: projectsData.completedExtensionProjects, color: '#10b981' },
  { name: 'Ongoing', value: projectsData.ongoingExtensionProjects, color: '#8b5cf6' },
];

const researchActivitiesStatusData = [
  { name: 'Completed', value: projectsData.completedResearchActivities, color: '#10b981' },
  { name: 'Ongoing', value: projectsData.ongoingResearchActivities, color: '#8b5cf6' },
];

const extensionActivitiesStatusData = [
  { name: 'Completed', value: projectsData.completedExtensionActivities, color: '#10b981' },
  { name: 'Ongoing', value: projectsData.ongoingExtensionActivities, color: '#8b5cf6' },
];

const ProjectsDashboard = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Projects Dashboard</h1>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Research Projects"
            count={projectsData.totalResearchProjects}
            icon={<Award size={20} />}
            linkTo="/projects/research"
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            textColor="text-white"
          />
          
          <DashboardCard
            title="Extension Projects"
            count={projectsData.totalExtensionProjects}
            icon={<GraduationCap size={20} />}
            linkTo="/projects/extension"
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            textColor="text-white"
          />
          
          <DashboardCard
            title="Research Activities"
            count={projectsData.totalResearchActivities}
            icon={<FileText size={20} />}
            linkTo="/projects/research-activities"
            bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
            textColor="text-white"
          />
          
          <DashboardCard
            title="Extension Activities"
            count={projectsData.totalExtensionActivities}
            icon={<Clipboard size={20} />}
            linkTo="/projects/extension-activities"
            bgColor="bg-gradient-to-br from-violet-500 to-violet-600"
            textColor="text-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900 hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
              <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2 text-lg">
                <BarChart size={18} />
                Yearly Projects Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
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
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-purple-900 hover:shadow-lg transition-all duration-300">
              <CardHeader className="border-b border-purple-100 dark:border-purple-800/50 pb-3">
                <CardTitle className="text-purple-700 dark:text-purple-300 text-lg">Project Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1 dark:text-gray-300">Research Projects</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={researchStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
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
                    <div className="flex justify-center gap-2 mt-1">
                      {researchStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs dark:text-gray-300">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1 dark:text-gray-300">Extension Projects</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={extensionStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
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
                    <div className="flex justify-center gap-2 mt-1">
                      {extensionStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs dark:text-gray-300">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1 dark:text-gray-300">Research Activities</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={researchActivitiesStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {researchActivitiesStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} activities`, name]}
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
                    <div className="flex justify-center gap-2 mt-1">
                      {researchActivitiesStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs dark:text-gray-300">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-center text-sm font-medium mb-1 dark:text-gray-300">Extension Activities</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={extensionActivitiesStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {extensionActivitiesStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} activities`, name]}
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
                    <div className="flex justify-center gap-2 mt-1">
                      {extensionActivitiesStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs dark:text-gray-300">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectsDashboard;
