
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
          className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Equipment / ICS</h1>
      </div>
      
      <Card className="mb-6 border shadow-sm bg-white dark:bg-gray-900 border-purple-100 dark:border-purple-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 dark:text-purple-500" size={18} />
              <Input 
                placeholder="Search for equipment..." 
                className="pl-10 border-purple-200 dark:border-purple-700 focus-visible:ring-purple-400 dark:bg-gray-800 dark:text-gray-200"
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
          
          <div className="rounded-md border border-purple-100 dark:border-purple-800 overflow-hidden shadow-sm">
            <Table>
              <TableCaption className="dark:text-gray-400">List of all ICS equipment in the inventory</TableCaption>
              <TableHeader className="bg-purple-50 dark:bg-gray-800/50">
                <TableRow className="dark:border-purple-800">
                  <TableHead className="text-purple-700 dark:text-purple-300">Description</TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300">Quantity</TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300">Unit</TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300">Total Amount</TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300">Inventory Item No.</TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300">Est. Useful Life</TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300">RIS No.</TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300">ICS No.</TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300">Status</TableHead>
                  <TableHead className="text-right text-purple-700 dark:text-purple-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="dark:bg-gray-900">
                {filteredEquipment.length > 0 ? (
                  filteredEquipment.map((item) => (
                    <TableRow key={item.id} className="dark:border-purple-800 dark:hover:bg-gray-800/50">
                      <TableCell className="dark:text-gray-200">{item.description}</TableCell>
                      <TableCell className="dark:text-gray-200">{item.quantity}</TableCell>
                      <TableCell className="dark:text-gray-200">{item.unit}</TableCell>
                      <TableCell className="dark:text-gray-200">₱{item.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="dark:text-gray-200">{item.inventoryItemNo}</TableCell>
                      <TableCell className="dark:text-gray-200">{item.estimatedUsefulLife}</TableCell>
                      <TableCell className="dark:text-gray-200">{item.risNo}</TableCell>
                      <TableCell className="dark:text-gray-200">{item.icsNo}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "Available" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
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
                            className="border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-700 dark:text-gray-200"
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
                            className="border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-700 dark:text-gray-200"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground dark:text-gray-500">
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
