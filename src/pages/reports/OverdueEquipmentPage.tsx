
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
import { Search, ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { overdueEquipment } from "@/pages/Index";

const OverdueEquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredEquipment = overdueEquipment.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.propertyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReturn = (itemId: number) => {
    toast({
      title: "Equipment Returned",
      description: "The equipment has been marked as returned successfully.",
    });
  };

  const handleSendReminder = (itemId: number) => {
    toast({
      title: "Reminder Sent",
      description: "A reminder has been sent to the borrower.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/reports')}
          className="hover:bg-purple-50"
        >
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-2xl font-bold text-purple-800">Overdue Equipment Report</h2>
      </div>
      
      <Card className="mb-6 border-purple-100 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="pt-6">
          <div className="relative w-full md:w-1/3 mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            <Input 
              placeholder="Search equipment or borrowers..." 
              className="pl-10 border-purple-200 focus-visible:ring-purple-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border-purple-100 overflow-hidden shadow-sm">
            <Table>
              <TableCaption>List of all overdue equipment</TableCaption>
              <TableHeader className="bg-purple-50">
                <TableRow>
                  <TableHead className="text-purple-900">Property No.</TableHead>
                  <TableHead className="text-purple-900">Description</TableHead>
                  <TableHead className="text-purple-900">Borrower</TableHead>
                  <TableHead className="text-purple-900">Date Borrowed</TableHead>
                  <TableHead className="text-purple-900">Due Date</TableHead>
                  <TableHead className="text-purple-900">Days Overdue</TableHead>
                  <TableHead className="text-right text-purple-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id} className="hover:bg-purple-50 transition-colors">
                    <TableCell className="font-medium text-purple-700">{item.propertyNo}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.borrower}</TableCell>
                    <TableCell>{item.borrowDate}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 font-medium">
                        {item.daysOverdue} days
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 border-green-200 text-green-600 hover:bg-green-50"
                          onClick={() => handleReturn(item.id)}
                        >
                          <Check size={14} />
                          Return
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50" 
                          onClick={() => handleSendReminder(item.id)}
                        >
                          Send Reminder
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default OverdueEquipmentPage;
