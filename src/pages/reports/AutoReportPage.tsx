
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRef } from "react";
import { Download, Printer } from "lucide-react";
import { overdueBooks, overdueEquipment, borrowers } from '@/pages/Index';

// Sample data for the report
const booksData = [
  { id: 1, bookNo: "B1001", title: "Introduction to Computer Science", author: "John Smith", location: "Shelf A", year: 2022, status: "Available" },
  { id: 2, bookNo: "B1002", title: "Advanced Web Development", author: "Sarah Jones", location: "Shelf B", year: 2021, status: "Overdue", borrower: "Juan Dela Cruz", dueDate: "2025-03-22" },
  { id: 3, bookNo: "B1003", title: "Data Structures", author: "Michael Brown", location: "Shelf A", year: 2020, status: "Available" },
  { id: 4, bookNo: "B1004", title: "Programming in Python", author: "Lisa Garcia", location: "Shelf C", year: 2023, status: "Borrowed", borrower: "Maria Santos", dueDate: "2025-04-15" },
  { id: 5, bookNo: "B1005", title: "Machine Learning Basics", author: "David Wilson", location: "Shelf B", year: 2020, status: "Overdue", borrower: "Pedro Reyes", dueDate: "2025-03-15" },
];

const equipmentICSData = [
  { id: 1, propertyNo: "E1001", description: "Laptop", quantity: 1, unit: "pc", status: "Available" },
  { id: 2, propertyNo: "E1002", description: "Projector", quantity: 1, unit: "pc", status: "Overdue", borrower: "Maria Santos", dueDate: "2025-03-20" },
  { id: 3, propertyNo: "E1003", description: "Whiteboard", quantity: 1, unit: "pc", status: "Available" },
  { id: 4, propertyNo: "E1004", description: "Monitor", quantity: 2, unit: "pcs", status: "Available" },
  { id: 5, propertyNo: "E1005", description: "Tablet", quantity: 1, unit: "pc", status: "Overdue", borrower: "Ana Gonzales", dueDate: "2025-04-10" },
];

const equipmentPARData = [
  { id: 1, propertyNo: "P1001", description: "Office Chair", quantity: 1, unit: "pc", status: "Overdue", borrower: "Carlos Tan", dueDate: "2025-04-20" },
  { id: 2, propertyNo: "P1002", description: "Filing Cabinet", quantity: 1, unit: "pc", status: "Available" },
  { id: 3, propertyNo: "P1003", description: "Desk", quantity: 1, unit: "pc", status: "Available" },
  { id: 4, propertyNo: "P1004", description: "Bookshelf", quantity: 1, unit: "pc", status: "Available" },
  { id: 5, propertyNo: "P1005", description: "Conference Table", quantity: 1, unit: "pc", status: "Available" },
];

const projectsData = [
  { id: 1, title: "AI Development Research", type: "Research", status: "Completed", year: "2023", lead: "Dr. Maria Santos" },
  { id: 2, title: "Community Computer Training", type: "Extension", status: "Ongoing", year: "2024", lead: "Prof. Juan Cruz" },
  { id: 3, title: "Machine Learning Applications", type: "Research", status: "Ongoing", year: "2024", lead: "Dr. Pedro Reyes" },
  { id: 4, title: "Digital Literacy Program", type: "Extension", status: "Completed", year: "2023", lead: "Prof. Ana Gonzales" },
  { id: 5, title: "Database Optimization Study", type: "Research", status: "Completed", year: "2023", lead: "Dr. Carlos Tan" },
  { id: 6, title: "Rural Tech Education", type: "Extension Activities", status: "Ongoing", year: "2024", lead: "Dr. Lisa Moore" },
  { id: 7, title: "Data Mining Research", type: "Research Activities", status: "Completed", year: "2023", lead: "Prof. James Wilson" },
  { id: 8, title: "Community Coding Workshop", type: "Extension Activities", status: "Completed", year: "2023", lead: "Dr. Elena Rodriguez" },
  { id: 9, title: "Neural Networks Study", type: "Research Activities", status: "Ongoing", year: "2024", lead: "Prof. Robert Chen" }
];

const projectsAnalytics = {
  research: {
    completed: projectsData.filter(p => p.type === "Research" && p.status === "Completed").length,
    ongoing: projectsData.filter(p => p.type === "Research" && p.status === "Ongoing").length,
    total: projectsData.filter(p => p.type === "Research").length
  },
  extension: {
    completed: projectsData.filter(p => p.type === "Extension" && p.status === "Completed").length,
    ongoing: projectsData.filter(p => p.type === "Extension" && p.status === "Ongoing").length,
    total: projectsData.filter(p => p.type === "Extension").length
  },
  researchActivities: {
    completed: projectsData.filter(p => p.type === "Research Activities" && p.status === "Completed").length,
    ongoing: projectsData.filter(p => p.type === "Research Activities" && p.status === "Ongoing").length,
    total: projectsData.filter(p => p.type === "Research Activities").length
  },
  extensionActivities: {
    completed: projectsData.filter(p => p.type === "Extension Activities" && p.status === "Completed").length,
    ongoing: projectsData.filter(p => p.type === "Extension Activities" && p.status === "Ongoing").length,
    total: projectsData.filter(p => p.type === "Extension Activities").length
  }
};

const AutoReportPage = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (reportRef.current) {
      const printContent = reportRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = `
        <div style="padding: 20px;">
          <h1 style="text-align: center; margin-bottom: 20px;">Generated Report</h1>
          ${printContent}
        </div>
      `;
      
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Auto-Generated Report</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={handlePrint}
          >
            <Printer size={18} />
            <span>Print</span>
          </Button>
          <Button
            className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700"
          >
            <Download size={18} />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>

      <div ref={reportRef}>
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="equipmentICS">Equipment ICS</TabsTrigger>
            <TabsTrigger value="equipmentPAR">Equipment PAR</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="projectSummary">Project Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="books">
            <Card>
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
                <CardTitle className="text-center text-purple-800 dark:text-purple-300">Books Inventory Report</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-100 dark:bg-purple-900/30">
                      <TableHead>Book No</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Borrower</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {booksData.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>{book.bookNo}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.location}</TableCell>
                        <TableCell>
                          <span className={
                            book.status === 'Available' ? 'text-green-600 dark:text-green-400' :
                            book.status === 'Borrowed' ? 'text-blue-600 dark:text-blue-400' :
                            'text-red-600 dark:text-red-400'
                          }>
                            {book.status}
                          </span>
                        </TableCell>
                        <TableCell>{book.borrower || '-'}</TableCell>
                        <TableCell>{book.dueDate ? formatDate(book.dueDate) : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-md bg-green-50 dark:bg-green-900/20">
                    <h3 className="font-medium text-green-800 dark:text-green-400">Available Books</h3>
                    <p className="text-lg font-bold">{booksData.filter(book => book.status === 'Available').length}</p>
                  </div>
                  <div className="border p-4 rounded-md bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-medium text-blue-800 dark:text-blue-400">Borrowed Books</h3>
                    <p className="text-lg font-bold">{booksData.filter(book => book.status === 'Borrowed').length}</p>
                  </div>
                  <div className="border p-4 rounded-md bg-red-50 dark:bg-red-900/20">
                    <h3 className="font-medium text-red-800 dark:text-red-400">Overdue Books</h3>
                    <p className="text-lg font-bold">{booksData.filter(book => book.status === 'Overdue').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipmentICS">
            <Card>
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
                <CardTitle className="text-center text-purple-800 dark:text-purple-300">Equipment ICS Inventory Report</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-100 dark:bg-purple-900/30">
                      <TableHead>Property No</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Borrower</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipmentICSData.map((equip) => (
                      <TableRow key={equip.id}>
                        <TableCell>{equip.propertyNo}</TableCell>
                        <TableCell>{equip.description}</TableCell>
                        <TableCell>{equip.quantity}</TableCell>
                        <TableCell>{equip.unit}</TableCell>
                        <TableCell>
                          <span className={
                            equip.status === 'Available' ? 'text-green-600 dark:text-green-400' :
                            equip.status === 'Borrowed' ? 'text-blue-600 dark:text-blue-400' :
                            'text-red-600 dark:text-red-400'
                          }>
                            {equip.status}
                          </span>
                        </TableCell>
                        <TableCell>{equip.borrower || '-'}</TableCell>
                        <TableCell>{equip.dueDate ? formatDate(equip.dueDate) : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-md bg-green-50 dark:bg-green-900/20">
                    <h3 className="font-medium text-green-800 dark:text-green-400">Available Equipment</h3>
                    <p className="text-lg font-bold">{equipmentICSData.filter(equip => equip.status === 'Available').length}</p>
                  </div>
                  <div className="border p-4 rounded-md bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-medium text-blue-800 dark:text-blue-400">Borrowed Equipment</h3>
                    <p className="text-lg font-bold">{equipmentICSData.filter(equip => equip.status === 'Borrowed').length}</p>
                  </div>
                  <div className="border p-4 rounded-md bg-red-50 dark:bg-red-900/20">
                    <h3 className="font-medium text-red-800 dark:text-red-400">Overdue Equipment</h3>
                    <p className="text-lg font-bold">{equipmentICSData.filter(equip => equip.status === 'Overdue').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipmentPAR">
            <Card>
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
                <CardTitle className="text-center text-purple-800 dark:text-purple-300">Equipment PAR Inventory Report</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-100 dark:bg-purple-900/30">
                      <TableHead>Property No</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Borrower</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipmentPARData.map((equip) => (
                      <TableRow key={equip.id}>
                        <TableCell>{equip.propertyNo}</TableCell>
                        <TableCell>{equip.description}</TableCell>
                        <TableCell>{equip.quantity}</TableCell>
                        <TableCell>{equip.unit}</TableCell>
                        <TableCell>
                          <span className={
                            equip.status === 'Available' ? 'text-green-600 dark:text-green-400' :
                            equip.status === 'Borrowed' ? 'text-blue-600 dark:text-blue-400' :
                            'text-red-600 dark:text-red-400'
                          }>
                            {equip.status}
                          </span>
                        </TableCell>
                        <TableCell>{equip.borrower || '-'}</TableCell>
                        <TableCell>{equip.dueDate ? formatDate(equip.dueDate) : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-md bg-green-50 dark:bg-green-900/20">
                    <h3 className="font-medium text-green-800 dark:text-green-400">Available Equipment</h3>
                    <p className="text-lg font-bold">{equipmentPARData.filter(equip => equip.status === 'Available').length}</p>
                  </div>
                  <div className="border p-4 rounded-md bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-medium text-blue-800 dark:text-blue-400">Borrowed Equipment</h3>
                    <p className="text-lg font-bold">{equipmentPARData.filter(equip => equip.status === 'Borrowed').length}</p>
                  </div>
                  <div className="border p-4 rounded-md bg-red-50 dark:bg-red-900/20">
                    <h3 className="font-medium text-red-800 dark:text-red-400">Overdue Equipment</h3>
                    <p className="text-lg font-bold">{equipmentPARData.filter(equip => equip.status === 'Overdue').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
                <CardTitle className="text-center text-purple-800 dark:text-purple-300">Projects Report</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-100 dark:bg-purple-900/30">
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Lead</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectsData.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.title}</TableCell>
                        <TableCell>{project.type}</TableCell>
                        <TableCell>{project.year}</TableCell>
                        <TableCell>{project.lead}</TableCell>
                        <TableCell>
                          <span className={
                            project.status === 'Completed' ? 'text-green-600 dark:text-green-400' :
                            'text-blue-600 dark:text-blue-400'
                          }>
                            {project.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-md bg-purple-50 dark:bg-purple-900/20">
                    <h3 className="font-medium text-purple-800 dark:text-purple-400">Total Projects</h3>
                    <p className="text-lg font-bold">{projectsData.length}</p>
                  </div>
                  <div className="border p-4 rounded-md bg-green-50 dark:bg-green-900/20">
                    <h3 className="font-medium text-green-800 dark:text-green-400">Completed Projects</h3>
                    <p className="text-lg font-bold">{projectsData.filter(project => project.status === 'Completed').length}</p>
                  </div>
                  <div className="border p-4 rounded-md bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-medium text-blue-800 dark:text-blue-400">Ongoing Projects</h3>
                    <p className="text-lg font-bold">{projectsData.filter(project => project.status === 'Ongoing').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projectSummary">
            <Card>
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
                <CardTitle className="text-center text-purple-800 dark:text-purple-300">Projects Summary Report</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="border border-purple-100 dark:border-purple-900">
                    <CardHeader className="bg-purple-50 dark:bg-purple-900/30 py-3">
                      <CardTitle className="text-lg text-purple-800 dark:text-purple-300">Research Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Total Projects:</span>
                          <span className="text-lg font-bold">{projectsAnalytics.research.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 dark:text-green-400">Completed:</span>
                          <span className="font-medium">{projectsAnalytics.research.completed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 dark:text-blue-400">Ongoing:</span>
                          <span className="font-medium">{projectsAnalytics.research.ongoing}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-blue-100 dark:border-blue-900">
                    <CardHeader className="bg-blue-50 dark:bg-blue-900/30 py-3">
                      <CardTitle className="text-lg text-blue-800 dark:text-blue-300">Extension Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Total Projects:</span>
                          <span className="text-lg font-bold">{projectsAnalytics.extension.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 dark:text-green-400">Completed:</span>
                          <span className="font-medium">{projectsAnalytics.extension.completed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 dark:text-blue-400">Ongoing:</span>
                          <span className="font-medium">{projectsAnalytics.extension.ongoing}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-indigo-100 dark:border-indigo-900">
                    <CardHeader className="bg-indigo-50 dark:bg-indigo-900/30 py-3">
                      <CardTitle className="text-lg text-indigo-800 dark:text-indigo-300">Research Activities</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Total Activities:</span>
                          <span className="text-lg font-bold">{projectsAnalytics.researchActivities.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 dark:text-green-400">Completed:</span>
                          <span className="font-medium">{projectsAnalytics.researchActivities.completed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 dark:text-blue-400">Ongoing:</span>
                          <span className="font-medium">{projectsAnalytics.researchActivities.ongoing}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-violet-100 dark:border-violet-900">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900/30 py-3">
                      <CardTitle className="text-lg text-violet-800 dark:text-violet-300">Extension Activities</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Total Activities:</span>
                          <span className="text-lg font-bold">{projectsAnalytics.extensionActivities.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 dark:text-green-400">Completed:</span>
                          <span className="font-medium">{projectsAnalytics.extensionActivities.completed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 dark:text-blue-400">Ongoing:</span>
                          <span className="font-medium">{projectsAnalytics.extensionActivities.ongoing}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-4">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800 py-3">
                    <CardTitle className="text-lg">Overall Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Total Projects:</span>
                          <span className="text-lg font-bold">{
                            projectsAnalytics.research.total + 
                            projectsAnalytics.extension.total + 
                            projectsAnalytics.researchActivities.total + 
                            projectsAnalytics.extensionActivities.total
                          }</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Research Projects:</span>
                          <span>{projectsAnalytics.research.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Extension Projects:</span>
                          <span>{projectsAnalytics.extension.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Research Activities:</span>
                          <span>{projectsAnalytics.researchActivities.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Extension Activities:</span>
                          <span>{projectsAnalytics.extensionActivities.total}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Total Completed:</span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">{
                            projectsAnalytics.research.completed + 
                            projectsAnalytics.extension.completed + 
                            projectsAnalytics.researchActivities.completed + 
                            projectsAnalytics.extensionActivities.completed
                          }</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Total Ongoing:</span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{
                            projectsAnalytics.research.ongoing + 
                            projectsAnalytics.extension.ongoing + 
                            projectsAnalytics.researchActivities.ongoing + 
                            projectsAnalytics.extensionActivities.ongoing
                          }</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AutoReportPage;
