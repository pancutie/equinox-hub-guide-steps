
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
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from a database
const initialEquipment = [
  { id: 2, propertyNo: "E1002", description: "Projector", quantity: 1, unit: "pc", borrower: "Maria Santos", borrowDate: "2023-03-18", returned: false },
  { id: 4, propertyNo: "E1004", description: "Tablet", quantity: 1, unit: "pc", borrower: "Ana Gonzales", borrowDate: "2023-03-10", returned: false },
  { id: 6, propertyNo: "E1006", description: "3D Printer", quantity: 1, unit: "pc", borrower: "Sofia Lim", borrowDate: "2023-03-14", returned: false },
];

const BorrowedEquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipment, setEquipment] = useState(initialEquipment);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredEquipment = equipment.filter(item => 
    !item.returned && (
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.propertyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.borrower.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleReturn = (id: number) => {
    setEquipment(equipment.map(item => 
      item.id === id ? { ...item, returned: true } : item
    ));
    
    toast({
      title: "Equipment Returned",
      description: "The equipment has been marked as returned",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/reports')}
          className="hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-2xl font-bold text-blue-700">Borrowed Equipment Report</h2>
      </div>
      
      <Card className="mb-6 border shadow-sm bg-white">
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
          
          <div className="rounded-md border overflow-hidden shadow-sm">
            <Table>
              <TableCaption>List of all borrowed equipment</TableCaption>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Property No.</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Date Borrowed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.length > 0 ? (
                  filteredEquipment.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.propertyNo}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.quantity} {item.unit}</TableCell>
                      <TableCell>{item.borrower}</TableCell>
                      <TableCell>{item.borrowDate}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                          Borrowed
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                          onClick={() => handleReturn(item.id)}
                        >
                          <Check size={14} />
                          Return
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No borrowed equipment found. All equipment has been returned.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default BorrowedEquipmentPage;
