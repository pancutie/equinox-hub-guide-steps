
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EquipmentIC } from "@/pages/equipment/EquipmentICPage";

interface AddEquipmentICDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<EquipmentIC, 'id'>) => void;
}

export default function AddEquipmentICDialog({
  isOpen,
  onClose,
  onSave
}: AddEquipmentICDialogProps) {
  const [formData, setFormData] = useState<Omit<EquipmentIC, 'id'>>({
    description: "",
    quantity: 1,
    unit: "",
    totalAmount: 0,
    inventoryItemNo: "",
    estimatedUsefulLife: "",
    risNo: "",
    icsNo: "",
    status: "Available"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "totalAmount" ? Number(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      description: "",
      quantity: 1,
      unit: "",
      totalAmount: 0,
      inventoryItemNo: "",
      estimatedUsefulLife: "",
      risNo: "",
      icsNo: "",
      status: "Available"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-purple-800">Add New Equipment (ICS)</DialogTitle>
          <DialogDescription>
            Add a new equipment to the inventory. Fill out all required fields.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalAmount">Total Amount</Label>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  min="0"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="inventoryItemNo">Inventory Item No.</Label>
                <Input
                  id="inventoryItemNo"
                  name="inventoryItemNo"
                  value={formData.inventoryItemNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="estimatedUsefulLife">Estimated Useful Life</Label>
                <Input
                  id="estimatedUsefulLife"
                  name="estimatedUsefulLife"
                  value={formData.estimatedUsefulLife}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="risNo">RIS No.</Label>
                <Input
                  id="risNo"
                  name="risNo"
                  value={formData.risNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="icsNo">ICS No.</Label>
                <Input
                  id="icsNo"
                  name="icsNo"
                  value={formData.icsNo}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as "Available" | "Borrowed" })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Borrowed">Borrowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="border-purple-200 hover:bg-purple-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              Add Equipment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
