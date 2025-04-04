
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Equipment } from "@/pages/EquipmentPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddEquipmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipment: Omit<Equipment, 'id'>) => void;
}

export default function AddEquipmentDialog({ isOpen, onClose, onSave }: AddEquipmentDialogProps) {
  const [equipment, setEquipment] = useState<Omit<Equipment, 'id'>>({
    propertyNo: "",
    description: "",
    quantity: 1,
    unit: "",
    dateAcquired: new Date().toISOString().split('T')[0],
    amount: 0,
    status: "Available",
    inventoryItemNo: "",
    estimatedUsefulLife: "",
    totalAmount: 0
  });

  const [activeTab, setActiveTab] = useState("standard");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "quantity" || name === "amount") {
      const numValue = parseInt(value) || 0;
      setEquipment(prev => ({
        ...prev,
        [name]: numValue,
        // Update totalAmount when quantity or amount changes
        ...(name === "quantity" ? { totalAmount: numValue * prev.amount } : 
           name === "amount" ? { totalAmount: numValue * prev.quantity } : {})
      }));
    } else {
      setEquipment(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(equipment);
    // Reset form
    setEquipment({
      propertyNo: "",
      description: "",
      quantity: 1,
      unit: "",
      dateAcquired: new Date().toISOString().split('T')[0],
      amount: 0,
      status: "Available",
      inventoryItemNo: "",
      estimatedUsefulLife: "",
      totalAmount: 0
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-blue-700 text-xl">Add New Equipment</DialogTitle>
            <DialogDescription>
              Enter the details of the new equipment. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="standard" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="standard">Standard Details</TabsTrigger>
              <TabsTrigger value="inventory">Inventory Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="propertyNo" className="text-right">
                  Property No.
                </Label>
                <Input
                  id="propertyNo"
                  name="propertyNo"
                  value={equipment.propertyNo}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={equipment.description}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={equipment.quantity}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unit
                </Label>
                <Input
                  id="unit"
                  name="unit"
                  value={equipment.unit}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateAcquired" className="text-right">
                  Date Acquired
                </Label>
                <Input
                  id="dateAcquired"
                  name="dateAcquired"
                  type="date"
                  value={equipment.dateAcquired}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount (₱)
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  value={equipment.amount}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="inventoryItemNo" className="text-right">
                  Inventory Item No.
                </Label>
                <Input
                  id="inventoryItemNo"
                  name="inventoryItemNo"
                  value={equipment.inventoryItemNo}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estimatedUsefulLife" className="text-right">
                  Estimated Useful Life
                </Label>
                <Input
                  id="estimatedUsefulLife"
                  name="estimatedUsefulLife"
                  value={equipment.estimatedUsefulLife}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="e.g., 5 years"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalAmount" className="text-right">
                  Total Amount (₱)
                </Label>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  min="0"
                  value={equipment.totalAmount || equipment.quantity * equipment.amount}
                  onChange={handleChange}
                  className="col-span-3"
                  readOnly
                />
                <p className="col-span-4 text-right text-xs text-muted-foreground">
                  Calculated from Quantity × Amount
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Equipment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
