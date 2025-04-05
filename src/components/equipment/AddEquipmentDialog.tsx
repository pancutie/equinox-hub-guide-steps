import { useState, useRef } from "react";
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
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define equipment type explicitly here instead of importing it
export interface Equipment {
  id: number;
  propertyNo: string;
  description: string;
  quantity: number;
  unit: string;
}

const formSchema = z.object({
  propertyNo: z.string().min(1, "Property number is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Unit is required"),
  type: z.enum(["Standard", "Inventory"]),
  // Additional fields for Inventory type equipment
  inventoryItemNo: z.string().optional(),
  estimatedUsefulLife: z.string().optional(),
  risNo: z.string().optional(),
  icsNo: z.string().optional(),
  totalAmount: z.string().optional(),
  dateAcquired: z.string().optional(),
  parNo: z.string().optional(),
  amount: z.string().optional(),
});

interface AddEquipmentDialogProps {
  onAddEquipment: (equipment: Equipment) => void;
}

const AddEquipmentDialog = ({ onAddEquipment }: AddEquipmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Use form from react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyNo: "",
      description: "",
      quantity: 1,
      unit: "pc",
      type: "Standard",
      inventoryItemNo: "",
      estimatedUsefulLife: "",
      risNo: "",
      icsNo: "",
      totalAmount: "",
      dateAcquired: "",
      parNo: "",
      amount: "",
    },
  });

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Basic equipment properties
    const newEquipment: Equipment = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      propertyNo: values.propertyNo,
      description: values.description,
      quantity: values.quantity,
      unit: values.unit,
    };

    // Add the equipment
    onAddEquipment(newEquipment);

    // Show success message
    toast({
      title: "Equipment Added",
      description: `${values.description} has been added successfully.`,
    });

    // Close the dialog
    setOpen(false);

    // Reset the form
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-1 h-5 w-5" />
          Add Equipment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
          <DialogDescription>Enter details for the new equipment.</DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipment Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Standard" id="standard" />
                        <label htmlFor="standard">Standard</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Inventory" id="inventory" />
                        <label htmlFor="inventory">Inventory</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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

            {/* Conditional fields based on equipment type */}
            {form.watch("type") === "Inventory" && (
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mt-2">Inventory Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="inventoryItemNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inventory Item No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter inventory item no." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimatedUsefulLife"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Useful Life</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter useful life" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter total amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="risNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RIS No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter RIS No." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="icsNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ICS No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ICS No." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAR No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter PAR No." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateAcquired"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Acquired</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="mr-2">Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Add Equipment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEquipmentDialog;
