
import MainLayout from "@/components/layout/MainLayout";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data - in a real app, this would come from a database
const mockEquipment = [
  { id: 2, propertyNo: "E1002", description: "Projector", quantity: 1, unit: "pc", borrower: "Maria Santos", borrowDate: "2023-02-18", dueDate: "2023-02-25", daysOverdue: 21 },
  { id: 6, propertyNo: "E1006", description: "3D Printer", quantity: 1, unit: "pc", borrower: "Sofia Lim", borrowDate: "2023-02-14", dueDate: "2023-02-21", daysOverdue: 25 },
];

const OverdueEquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredEquipment = mockEquipment.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.propertyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/reports')}
        >
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-2xl font-bold">Overdue Equipment Report</h2>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative w-full md:w-1/3 mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search equipment or borrowers..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all overdue equipment</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Property No.</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Date Borrowed</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.propertyNo}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.borrower}</TableCell>
                    <TableCell>{item.borrowDate}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        {item.daysOverdue} days
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Check size={14} />
                          Return
                        </Button>
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default OverdueEquipmentPage;
