
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
import { Search, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data - in a real app, this would come from a database
const mockEquipment = [
  { id: 1, propertyNo: "E1001", description: "Microscope", quantity: 5, unit: "pcs", dateAcquired: "2021-05-15", amount: 25000 },
  { id: 3, propertyNo: "E1003", description: "Laboratory Kit", quantity: 10, unit: "sets", dateAcquired: "2022-01-20", amount: 8000 },
  { id: 5, propertyNo: "E1005", description: "Laptop", quantity: 4, unit: "pcs", dateAcquired: "2022-03-05", amount: 35000 },
  { id: 7, propertyNo: "E1007", description: "Digital Camera", quantity: 2, unit: "pcs", dateAcquired: "2020-06-22", amount: 18000 },
  { id: 8, propertyNo: "E1008", description: "Audio Mixer", quantity: 1, unit: "pc", dateAcquired: "2022-02-10", amount: 22000 },
];

const AvailableEquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredEquipment = mockEquipment.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.propertyNo.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-2xl font-bold">Available Equipment Report</h2>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative w-full md:w-1/3 mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search equipment..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all available equipment</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Property No.</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Date Acquired</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.propertyNo}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.dateAcquired}</TableCell>
                    <TableCell>₱{item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Available
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Borrow</Button>
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

export default AvailableEquipmentPage;
