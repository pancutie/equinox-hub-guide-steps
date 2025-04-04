
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
      <DialogContent className="sm:max-w-[550px] bg-white border-purple-200 shadow-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-purple-700 text-xl font-bold">Add New Equipment</DialogTitle>
            <DialogDescription>
              Enter the details of the new equipment. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyNo">Property No.</Label>
                  <Input
                    id="propertyNo"
                    name="propertyNo"
                    value={equipment.propertyNo}
                    onChange={handleChange}
                    required
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={equipment.description}
                    onChange={handleChange}
                    required
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={equipment.quantity}
                    onChange={handleChange}
                    required
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    name="unit"
                    value={equipment.unit}
                    onChange={handleChange}
                    required
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dateAcquired">Date Acquired</Label>
                  <Input
                    id="dateAcquired"
                    name="dateAcquired"
                    type="date"
                    value={equipment.dateAcquired}
                    onChange={handleChange}
                    required
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₱)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    value={equipment.amount}
                    onChange={handleChange}
                    required
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inventoryItemNo">Inventory Item No.</Label>
                  <Input
                    id="inventoryItemNo"
                    name="inventoryItemNo"
                    value={equipment.inventoryItemNo}
                    onChange={handleChange}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estimatedUsefulLife">Estimated Useful Life</Label>
                  <Input
                    id="estimatedUsefulLife"
                    name="estimatedUsefulLife"
                    value={equipment.estimatedUsefulLife}
                    onChange={handleChange}
                    placeholder="e.g., 5 years"
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Amount (₱)</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                min="0"
                value={equipment.totalAmount || equipment.quantity * equipment.amount}
                className="border-purple-200 focus-visible:ring-purple-500 bg-purple-50"
                readOnly
              />
              <p className="text-xs text-muted-foreground">
                Calculated from Quantity × Amount
              </p>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} className="border-purple-200 hover:bg-purple-50 hover:text-purple-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Save Equipment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
