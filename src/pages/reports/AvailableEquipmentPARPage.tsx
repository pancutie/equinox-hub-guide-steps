
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Search, FileDown, Printer } from "lucide-react";

// Sample data for available equipment PAR
const availableEquipmentPAR = [
  { id: 1, name: "Office Desk", parNumber: "PAR-12345", quantity: 10, condition: "Good", location: "Admin Office", category: "Furniture" },
  { id: 2, name: "Office Chair", parNumber: "PAR-67890", quantity: 15, condition: "Excellent", location: "Conference Room", category: "Furniture" },
  { id: 3, name: "Filing Cabinet", parNumber: "PAR-13579", quantity: 5, condition: "Good", location: "Records Room", category: "Furniture" },
  { id: 4, name: "Whiteboard", parNumber: "PAR-24680", quantity: 8, condition: "Good", location: "Training Room", category: "Office Equipment" },
  { id: 5, name: "Bookshelf", parNumber: "PAR-97531", quantity: 6, condition: "Fair", location: "Library", category: "Furniture" }
];

const AvailableEquipmentPARPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEquipment = availableEquipmentPAR.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Available Equipment (PAR)</h1>
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
                    <TableHead>PAR Number</TableHead>
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
                        <TableCell>{item.parNumber}</TableCell>
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

export default AvailableEquipmentPARPage;
