
import { useState } from "react";
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
import { Search, Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import AddEquipmentICDialog from "@/components/equipment/AddEquipmentICDialog";
import EditEquipmentICDialog from "@/components/equipment/EditEquipmentICDialog";

// Equipment ICS data structure
export interface EquipmentIC {
  id: number;
  description: string;
  quantity: number;
  unit: string;
  totalAmount: number;
  inventoryItemNo: string;
  estimatedUsefulLife: string;
  risNo: string;
  icsNo: string;
  status: "Available" | "Borrowed";
}

// Mock data
const initialEquipmentIC = [
  { id: 1, description: "Laptop", quantity: 5, unit: "pcs", totalAmount: 125000, inventoryItemNo: "INV-001", estimatedUsefulLife: "5 years", risNo: "RIS-001", icsNo: "ICS-001", status: "Available" as const },
  { id: 2, description: "Desktop Computer", quantity: 10, unit: "sets", totalAmount: 350000, inventoryItemNo: "INV-002", estimatedUsefulLife: "4 years", risNo: "RIS-002", icsNo: "ICS-002", status: "Borrowed" as const },
  { id: 3, description: "Projector", quantity: 2, unit: "pcs", totalAmount: 60000, inventoryItemNo: "INV-003", estimatedUsefulLife: "3 years", risNo: "RIS-003", icsNo: "ICS-003", status: "Available" as const },
  { id: 4, description: "Scanner", quantity: 3, unit: "pcs", totalAmount: 75000, inventoryItemNo: "INV-004", estimatedUsefulLife: "5 years", risNo: "RIS-004", icsNo: "ICS-004", status: "Borrowed" as const },
];

const EquipmentICPage = () => {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<EquipmentIC[]>(initialEquipmentIC);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentIC | null>(null);
  const { toast } = useToast();
  
  const filteredEquipment = equipment.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.icsNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add a new equipment
  const handleAddEquipment = (item: Omit<EquipmentIC, 'id'>) => {
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
  const handleEditEquipment = (updatedEquipment: EquipmentIC) => {
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
      <div className="flex items-center gap-3 mb-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/equipment')}
          className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-purple-800">Equipment / ICS</h1>
      </div>
      
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
            <Button 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus size={18} />
              Add New Equipment
            </Button>
          </div>
          
          <div className="rounded-md border border-purple-100 overflow-hidden shadow-sm">
            <Table>
              <TableCaption>List of all ICS equipment in the inventory</TableCaption>
              <TableHeader className="bg-purple-50">
                <TableRow>
                  <TableHead className="text-purple-700">Description</TableHead>
                  <TableHead className="text-purple-700">Quantity</TableHead>
                  <TableHead className="text-purple-700">Unit</TableHead>
                  <TableHead className="text-purple-700">Total Amount</TableHead>
                  <TableHead className="text-purple-700">Inventory Item No.</TableHead>
                  <TableHead className="text-purple-700">Est. Useful Life</TableHead>
                  <TableHead className="text-purple-700">RIS No.</TableHead>
                  <TableHead className="text-purple-700">ICS No.</TableHead>
                  <TableHead className="text-purple-700">Status</TableHead>
                  <TableHead className="text-right text-purple-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.length > 0 ? (
                  filteredEquipment.map((item) => (
                    <TableRow key={item.id} className="hover:bg-purple-50/50">
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>₱{item.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{item.inventoryItemNo}</TableCell>
                      <TableCell>{item.estimatedUsefulLife}</TableCell>
                      <TableCell>{item.risNo}</TableCell>
                      <TableCell>{item.icsNo}</TableCell>
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
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
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
      <AddEquipmentICDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddEquipment}
      />

      {/* Edit Equipment Dialog */}
      {selectedEquipment && (
        <EditEquipmentICDialog 
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

export default EquipmentICPage;
