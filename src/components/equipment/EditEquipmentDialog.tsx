
// Import statements kept the same, but fix the Equipment import
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { Equipment } from "@/components/equipment/AddEquipmentDialog";

const formSchema = z.object({
  propertyNo: z.string().min(1, "Property number is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Unit is required"),
});

interface EditEquipmentDialogProps {
  equipment: Equipment;
  onUpdateEquipment: (equipment: Equipment) => void;
}

const EditEquipmentDialog = ({ equipment, onUpdateEquipment }: EditEquipmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Use form from react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyNo: equipment.propertyNo,
      description: equipment.description,
      quantity: equipment.quantity,
      unit: equipment.unit,
    },
  });

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Update the equipment with the new values
    const updatedEquipment = {
      ...equipment,
      propertyNo: values.propertyNo,
      description: values.description,
      quantity: values.quantity,
      unit: values.unit,
    };

    // Update the equipment
    onUpdateEquipment(updatedEquipment);

    // Show success message
    toast({
      title: "Equipment Updated",
      description: `${values.description} has been updated successfully.`,
    });

    // Close the dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Equipment</DialogTitle>
          <DialogDescription>Make changes to the equipment details.</DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="propertyNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property No.</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter property number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter quantity" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="pc, set, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="mr-2">Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Update Equipment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEquipmentDialog;
