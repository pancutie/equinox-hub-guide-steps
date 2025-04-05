
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
import AddEquipmentPARDialog from "@/components/equipment/AddEquipmentPARDialog";
import EditEquipmentPARDialog from "@/components/equipment/EditEquipmentPARDialog";

// Equipment PAR data structure
export interface EquipmentPAR {
  id: number;
  propertyNo: string;
  description: string;
  quantity: number;
  unit: string;
  dateAcquired: string;
  amount: number;
  parNo: string;
  status: "Available" | "Borrowed";
}

// Mock data
const initialEquipmentPAR = [
  { id: 1, propertyNo: "P1001", description: "Office Chair", quantity: 10, unit: "pcs", dateAcquired: "2022-05-15", amount: 2500, parNo: "PAR-2022-001", status: "Available" as const },
  { id: 2, propertyNo: "P1002", description: "Office Desk", quantity: 5, unit: "pcs", dateAcquired: "2022-06-20", amount: 5000, parNo: "PAR-2022-002", status: "Borrowed" as const },
  { id: 3, propertyNo: "P1003", description: "Filing Cabinet", quantity: 3, unit: "pcs", dateAcquired: "2022-07-10", amount: 6000, parNo: "PAR-2022-003", status: "Available" as const },
  { id: 4, propertyNo: "P1004", description: "Bookshelf", quantity: 2, unit: "pcs", dateAcquired: "2022-08-05", amount: 4500, parNo: "PAR-2022-004", status: "Borrowed" as const },
];

const EquipmentPARPage = () => {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<EquipmentPAR[]>(initialEquipmentPAR);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentPAR | null>(null);
  const { toast } = useToast();
  
  const filteredEquipment = equipment.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.propertyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.parNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add a new equipment
  const handleAddEquipment = (item: Omit<EquipmentPAR, 'id'>) => {
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
  const handleEditEquipment = (updatedEquipment: EquipmentPAR) => {
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
        <h1 className="text-2xl font-bold text-purple-800">Equipment / PAR</h1>
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
              <TableCaption>List of all PAR equipment in the inventory</TableCaption>
              <TableHeader className="bg-purple-50">
                <TableRow>
                  <TableHead className="text-purple-700">Property No.</TableHead>
                  <TableHead className="text-purple-700">Description</TableHead>
                  <TableHead className="text-purple-700">Quantity</TableHead>
                  <TableHead className="text-purple-700">Unit</TableHead>
                  <TableHead className="text-purple-700">Date Acquired</TableHead>
                  <TableHead className="text-purple-700">Amount</TableHead>
                  <TableHead className="text-purple-700">PAR No.</TableHead>
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
                      <TableCell>{item.parNo}</TableCell>
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
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
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
      <AddEquipmentPARDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddEquipment}
      />

      {/* Edit Equipment Dialog */}
      {selectedEquipment && (
        <EditEquipmentPARDialog 
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

export default EquipmentPARPage;
