
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
import { Search, Plus, Edit, Trash2, Bell } from "lucide-react";
import AddEquipmentDialog from "@/components/equipment/AddEquipmentDialog";
import EditEquipmentDialog from "@/components/equipment/EditEquipmentDialog";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import NotificationPopover from "@/components/shared/NotificationPopover";

// Equipment data structure
export interface Equipment {
  id: number;
  propertyNo: string;
  description: string;
  quantity: number;
  unit: string;
  dateAcquired: string;
  amount: number;
  status: "Available" | "Borrowed";
  inventoryItemNo?: string;
  estimatedUsefulLife?: string;
  totalAmount?: number;
}

// Mock data - in a real app, this would come from a database
const initialEquipment = [
  { id: 1, propertyNo: "E1001", description: "Microscope", quantity: 5, unit: "pcs", dateAcquired: "2021-05-15", amount: 25000, status: "Available" as const, inventoryItemNo: "INV-001", estimatedUsefulLife: "5 years", totalAmount: 125000 },
  { id: 2, propertyNo: "E1002", description: "Projector", quantity: 3, unit: "pcs", dateAcquired: "2020-11-30", amount: 15000, status: "Borrowed" as const, inventoryItemNo: "INV-002", estimatedUsefulLife: "3 years", totalAmount: 45000 },
  { id: 3, propertyNo: "E1003", description: "Laboratory Kit", quantity: 10, unit: "sets", dateAcquired: "2022-01-20", amount: 8000, status: "Available" as const, inventoryItemNo: "INV-003", estimatedUsefulLife: "4 years", totalAmount: 80000 },
  { id: 4, propertyNo: "E1004", description: "Tablet", quantity: 8, unit: "pcs", dateAcquired: "2021-09-10", amount: 12000, status: "Borrowed" as const, inventoryItemNo: "INV-004", estimatedUsefulLife: "3 years", totalAmount: 96000 },
  { id: 5, propertyNo: "E1005", description: "Laptop", quantity: 4, unit: "pcs", dateAcquired: "2022-03-05", amount: 35000, status: "Available" as const, inventoryItemNo: "INV-005", estimatedUsefulLife: "5 years", totalAmount: 140000 },
  { id: 6, propertyNo: "E1006", description: "3D Printer", quantity: 1, unit: "pc", dateAcquired: "2021-12-15", amount: 50000, status: "Borrowed" as const, inventoryItemNo: "INV-006", estimatedUsefulLife: "5 years", totalAmount: 50000 },
  { id: 7, propertyNo: "E1007", description: "Digital Camera", quantity: 2, unit: "pcs", dateAcquired: "2020-06-22", amount: 18000, status: "Available" as const, inventoryItemNo: "INV-007", estimatedUsefulLife: "4 years", totalAmount: 36000 },
  { id: 8, propertyNo: "E1008", description: "Audio Mixer", quantity: 1, unit: "pc", dateAcquired: "2022-02-10", amount: 22000, status: "Available" as const, inventoryItemNo: "INV-008", estimatedUsefulLife: "5 years", totalAmount: 22000 },
];

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const { toast } = useToast();
  
  const filteredEquipment = equipment.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.propertyNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add a new equipment
  const handleAddEquipment = (item: Omit<Equipment, 'id'>) => {
    const newEquipment = {
      ...item,
      id: equipment.length ? Math.max(...equipment.map(e => e.id)) + 1 : 1
    };
    setEquipment([...equipment, newEquipment]);
    setIsAddDialogOpen(false);
    toast({
      title: "Equipment Added",
      description: "New equipment has been added successfully",
    });
  };

  // Function to edit equipment
  const handleEditEquipment = (updatedEquipment: Equipment) => {
    setEquipment(equipment.map(item => item.id === updatedEquipment.id ? updatedEquipment : item));
    setIsEditDialogOpen(false);
    toast({
      title: "Equipment Updated",
      description: "Equipment has been updated successfully",
    });
  };

  // Function to delete equipment
  const handleDeleteEquipment = () => {
    if (selectedEquipment) {
      setEquipment(equipment.filter(item => item.id !== selectedEquipment.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Equipment Deleted",
        description: "Equipment has been deleted successfully",
      });
    }
  };

  return (
    <MainLayout>
      <Card className="mb-6 border shadow-sm bg-white border-purple-100">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
              <Input 
                placeholder="Search for equipment..." 
                className="pl-10 border-purple-200 focus-visible:ring-purple-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <NotificationPopover />
              <Button 
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus size={18} />
                Add New Equipment
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-purple-100 overflow-hidden shadow-sm">
            <Table>
              <TableCaption>List of all equipment in the inventory</TableCaption>
              <TableHeader className="bg-purple-50">
                <TableRow>
                  <TableHead className="text-purple-700">Property No.</TableHead>
                  <TableHead className="text-purple-700">Description</TableHead>
                  <TableHead className="text-purple-700">Quantity</TableHead>
                  <TableHead className="text-purple-700">Unit</TableHead>
                  <TableHead className="text-purple-700">Date Acquired</TableHead>
                  <TableHead className="text-purple-700">Amount</TableHead>
                  <TableHead className="text-purple-700">Inv. Item No.</TableHead>
                  <TableHead className="text-purple-700">Est. Useful Life</TableHead>
                  <TableHead className="text-purple-700">Total</TableHead>
                  <TableHead className="text-purple-700">Status</TableHead>
                  <TableHead className="text-right text-purple-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.length > 0 ? (
                  filteredEquipment.map((item) => (
                    <TableRow key={item.id} className="hover:bg-purple-50/50">
                      <TableCell className="font-medium">{item.propertyNo}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.dateAcquired}</TableCell>
                      <TableCell>₱{item.amount.toLocaleString()}</TableCell>
                      <TableCell>{item.inventoryItemNo || 'N/A'}</TableCell>
                      <TableCell>{item.estimatedUsefulLife || 'N/A'}</TableCell>
                      <TableCell>₱{(item.totalAmount || (item.quantity * item.amount)).toLocaleString()}</TableCell>
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedEquipment(item);
                              setIsEditDialogOpen(true);
                            }}
                            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedEquipment(item);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                      No equipment found. Try adjusting your search or add a new equipment.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Equipment Dialog */}
      <AddEquipmentDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddEquipment}
      />

      {/* Edit Equipment Dialog */}
      {selectedEquipment && (
        <EditEquipmentDialog 
          isOpen={isEditDialogOpen} 
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleEditEquipment}
          equipment={selectedEquipment}
        />
      )}

      {/* Delete Confirm Dialog */}
      {selectedEquipment && (
        <DeleteConfirmDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteEquipment}
          title="Delete Equipment"
          description={`Are you sure you want to delete "${selectedEquipment.description}"? This action cannot be undone.`}
        />
      )}
    </MainLayout>
  );
};

export default EquipmentPage;
