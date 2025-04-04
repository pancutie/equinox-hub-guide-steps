
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
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
import { Search, Plus } from "lucide-react";

// Mock data - in a real app, this would come from a database
const mockEquipment = [
  { id: 1, propertyNo: "E1001", description: "Microscope", quantity: 5, unit: "pcs", dateAcquired: "2021-05-15", amount: 25000, status: "Available" },
  { id: 2, propertyNo: "E1002", description: "Projector", quantity: 3, unit: "pcs", dateAcquired: "2020-11-30", amount: 15000, status: "Borrowed" },
  { id: 3, propertyNo: "E1003", description: "Laboratory Kit", quantity: 10, unit: "sets", dateAcquired: "2022-01-20", amount: 8000, status: "Available" },
  { id: 4, propertyNo: "E1004", description: "Tablet", quantity: 8, unit: "pcs", dateAcquired: "2021-09-10", amount: 12000, status: "Borrowed" },
  { id: 5, propertyNo: "E1005", description: "Laptop", quantity: 4, unit: "pcs", dateAcquired: "2022-03-05", amount: 35000, status: "Available" },
  { id: 6, propertyNo: "E1006", description: "3D Printer", quantity: 1, unit: "pc", dateAcquired: "2021-12-15", amount: 50000, status: "Borrowed" },
  { id: 7, propertyNo: "E1007", description: "Digital Camera", quantity: 2, unit: "pcs", dateAcquired: "2020-06-22", amount: 18000, status: "Available" },
  { id: 8, propertyNo: "E1008", description: "Audio Mixer", quantity: 1, unit: "pc", dateAcquired: "2022-02-10", amount: 22000, status: "Available" },
];

const EquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEquipment = mockEquipment.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.propertyNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search for equipment..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              Add New Equipment
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all equipment in the library</TableCaption>
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
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Available" 
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
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

export default EquipmentPage;
