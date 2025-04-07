
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Search, FileDown, Printer, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample data for borrowed equipment PAR
const borrowedEquipmentPAR = [
  { 
    id: 1, 
    name: "Office Desk", 
    parNumber: "PAR-12345", 
    borrower: "John Smith", 
    borrowDate: "2025-03-15", 
    dueDate: "2025-04-15", 
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Office Chair", 
    parNumber: "PAR-67890", 
    borrower: "Emily Johnson", 
    borrowDate: "2025-03-20", 
    dueDate: "2025-04-20", 
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Filing Cabinet", 
    parNumber: "PAR-13579", 
    borrower: "Michael Williams", 
    borrowDate: "2025-03-10", 
    dueDate: "2025-04-10", 
    status: "Active" 
  },
  { 
    id: 4, 
    name: "Whiteboard", 
    parNumber: "PAR-24680", 
    borrower: "Sarah Brown", 
    borrowDate: "2025-03-05", 
    dueDate: "2025-04-05", 
    status: "Active" 
  },
  { 
    id: 5, 
    name: "Bookshelf", 
    parNumber: "PAR-97531", 
    borrower: "David Miller", 
    borrowDate: "2025-03-25", 
    dueDate: "2025-04-25", 
    status: "Active" 
  }
];

const BorrowedEquipmentPARPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEquipment = borrowedEquipmentPAR.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate days left or days overdue
  const calculateDaysStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      days: Math.abs(diffDays),
      isOverdue: diffDays < 0
    };
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Borrowed Equipment (PAR)</h1>
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

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Borrowed Equipment List</CardTitle>
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">PAR Number</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead className="hidden sm:table-cell">Borrowed Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.length > 0 ? (
                    filteredEquipment.map((item) => {
                      const status = calculateDaysStatus(item.dueDate);
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.parNumber}</TableCell>
                          <TableCell>{item.borrower}</TableCell>
                          <TableCell className="hidden sm:table-cell">{item.borrowDate}</TableCell>
                          <TableCell>{item.dueDate}</TableCell>
                          <TableCell>
                            {status.isOverdue ? (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <span>Overdue</span>
                                <span className="text-xs">({status.days} days)</span>
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <span>Active</span>
                                <span className="text-xs">({status.days} days left)</span>
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No equipment found matching your search.
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

export default BorrowedEquipmentPARPage;
