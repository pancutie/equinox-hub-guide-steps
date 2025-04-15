
import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddBorrowingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: {
    transactionType: "Book" | "Equipment";
    itemNo: string;
    description: string;
    borrower: string;
    borrowDate: string;
  }) => void;
}

export default function AddBorrowingDialog({
  isOpen,
  onClose,
  onSave,
}: AddBorrowingDialogProps) {
  const [transactionType, setTransactionType] = useState<"Book" | "Equipment">("Book");
  const [itemNo, setItemNo] = useState("");
  const [description, setDescription] = useState("");
  const [borrower, setBorrower] = useState("");
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const [borrowDate, setBorrowDate] = useState(today);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      transactionType,
      itemNo,
      description,
      borrower,
      borrowDate,
    });
    
    // Reset form
    setTransactionType("Book");
    setItemNo("");
    setDescription("");
    setBorrower("");
    setBorrowDate(today);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Borrowing</DialogTitle>
            <DialogDescription>
              Fill in the details to record a new borrowing transaction.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="transaction-type">Type</Label>
              <RadioGroup
                id="transaction-type"
                value={transactionType}
                onValueChange={(value) => setTransactionType(value as "Book" | "Equipment")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Book" id="book" />
                  <Label htmlFor="book" className="cursor-pointer">Book</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Equipment" id="equipment" />
                  <Label htmlFor="equipment" className="cursor-pointer">Equipment</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="item-no">Item No.</Label>
              <Input
                id="item-no"
                placeholder={transactionType === "Book" ? "e.g., B1001" : "e.g., E1001"}
                value={itemNo}
                onChange={(e) => setItemNo(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder={transactionType === "Book" ? "Book Title" : "Equipment Name"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="borrower">Borrower</Label>
              <Input
                id="borrower"
                placeholder="Full Name"
                value={borrower}
                onChange={(e) => setBorrower(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="borrow-date">Date Borrowed</Label>
              <Input
                id="borrow-date"
                type="date"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                max={today}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
