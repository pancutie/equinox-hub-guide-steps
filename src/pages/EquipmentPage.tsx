
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
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import AddEquipmentDialog from "@/components/equipment/AddEquipmentDialog";
import EditEquipmentDialog from "@/components/equipment/EditEquipmentDialog";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

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
}

// Mock data - in a real app, this would come from a database
const initialEquipment = [
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
      <Card className="mb-6 border shadow-sm">
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
            <Button 
              className="flex items-center gap-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus size={18} />
              Add New Equipment
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all equipment in the inventory</TableCaption>
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
                {filteredEquipment.length > 0 ? (
                  filteredEquipment.map((item) => (
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedEquipment(item);
                              setIsEditDialogOpen(true);
                            }}
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
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
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
