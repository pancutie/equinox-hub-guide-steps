
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Search, FileDown, Printer, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample data for overdue equipment PAR
const overdueEquipmentPAR = [
  { 
    id: 1, 
    name: "Office Desk", 
    parNumber: "PAR-12345", 
    borrower: "John Smith", 
    borrowDate: "2025-02-15", 
    dueDate: "2025-03-15", 
    daysOverdue: 23
  },
  { 
    id: 2, 
    name: "Office Chair", 
    parNumber: "PAR-67890", 
    borrower: "Emily Johnson", 
    borrowDate: "2025-02-20", 
    dueDate: "2025-03-20", 
    daysOverdue: 18
  },
  { 
    id: 3, 
    name: "Filing Cabinet", 
    parNumber: "PAR-13579", 
    borrower: "Michael Williams", 
    borrowDate: "2025-02-10", 
    dueDate: "2025-03-10", 
    daysOverdue: 28
  },
  { 
    id: 4, 
    name: "Whiteboard", 
    parNumber: "PAR-24680", 
    borrower: "Sarah Brown", 
    borrowDate: "2025-02-05", 
    dueDate: "2025-03-05", 
    daysOverdue: 33
  },
  { 
    id: 5, 
    name: "Bookshelf", 
    parNumber: "PAR-97531", 
    borrower: "David Miller", 
    borrowDate: "2025-01-25", 
    dueDate: "2025-02-25", 
    daysOverdue: 41
  }
];

const OverdueEquipmentPARPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEquipment = overdueEquipmentPAR.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Overdue Equipment (PAR)
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer size={16} />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileDown size={16} />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        <Card className="border-red-200 dark:border-red-900">
          <CardHeader className="pb-3">
            <CardTitle>Overdue Equipment List</CardTitle>
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search equipment..."
                className="pl-8 max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-red-200 dark:border-red-900">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">PAR Number</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead className="hidden md:table-cell">Borrowed Date</TableHead>
                    <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.length > 0 ? (
                    filteredEquipment.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.parNumber}</TableCell>
                        <TableCell>{item.borrower}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.borrowDate}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{item.daysOverdue} days</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="destructive">
                            Notify
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No overdue equipment found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default OverdueEquipmentPARPage;
