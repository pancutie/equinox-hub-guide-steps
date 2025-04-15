
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Search, FileDown, Printer } from "lucide-react";

// Sample data for available equipment ICS
const availableEquipmentICS = [
  { id: 1, name: "Laptop", serialNumber: "L12345", quantity: 5, condition: "Good", location: "Room 101", category: "Computer" },
  { id: 2, name: "Projector", serialNumber: "P67890", quantity: 3, condition: "Excellent", location: "Room 201", category: "Presentation" },
  { id: 3, name: "Scanner", serialNumber: "S13579", quantity: 2, condition: "Good", location: "Library", category: "Computer" },
  { id: 4, name: "Digital Camera", serialNumber: "DC24680", quantity: 4, condition: "Good", location: "Media Lab", category: "Media" },
  { id: 5, name: "Audio Recorder", serialNumber: "AR97531", quantity: 3, condition: "Fair", location: "Room 302", category: "Audio" }
];

const AvailableEquipmentICSPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEquipment = availableEquipmentICS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Available Equipment (ICS)</h1>
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
            <CardTitle>Equipment List</CardTitle>
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
                    <TableHead>Serial Number</TableHead>
                    <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                    <TableHead className="hidden sm:table-cell">Condition</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.length > 0 ? (
                    filteredEquipment.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.serialNumber}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.quantity}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.condition}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.location}</TableCell>
                        <TableCell>{item.category}</TableCell>
                      </TableRow>
                    ))
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

export default AvailableEquipmentICSPage;
