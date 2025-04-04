
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
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
import { Search, Plus, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - in a real app, this would come from a database
const mockTransactions = [
  { id: 1, transactionType: "Book", itemNo: "B1002", description: "Advanced Web Development", borrower: "Juan Dela Cruz", borrowDate: "2023-03-15", returnDate: "2023-03-22", status: "Returned" },
  { id: 2, transactionType: "Equipment", itemNo: "E1002", description: "Projector", borrower: "Maria Santos", borrowDate: "2023-03-18", returnDate: null, status: "Borrowed" },
  { id: 3, transactionType: "Book", itemNo: "B1005", description: "Machine Learning Basics", borrower: "Pedro Reyes", borrowDate: "2023-03-20", returnDate: null, status: "Borrowed" },
  { id: 4, transactionType: "Equipment", itemNo: "E1004", description: "Tablet", borrower: "Ana Gonzales", borrowDate: "2023-03-10", returnDate: "2023-03-17", status: "Returned" },
  { id: 5, transactionType: "Book", itemNo: "B1007", description: "Software Engineering", borrower: "Carlos Tan", borrowDate: "2023-03-12", returnDate: null, status: "Borrowed" },
  { id: 6, transactionType: "Equipment", itemNo: "E1006", description: "3D Printer", borrower: "Sofia Lim", borrowDate: "2023-03-14", returnDate: null, status: "Borrowed" },
  { id: 7, transactionType: "Book", itemNo: "B1003", description: "Database Management", borrower: "Jose Garcia", borrowDate: "2023-03-05", returnDate: "2023-03-12", status: "Returned" },
  { id: 8, transactionType: "Equipment", itemNo: "E1001", description: "Microscope", borrower: "Luisa Cruz", borrowDate: "2023-03-08", returnDate: "2023-03-15", status: "Returned" },
];

const BorrowingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by search term
    const matchesSearch = 
      transaction.itemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.borrower.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filter by tab
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "books") return matchesSearch && transaction.transactionType === "Book";
    if (activeTab === "equipment") return matchesSearch && transaction.transactionType === "Equipment";
    if (activeTab === "borrowed") return matchesSearch && transaction.status === "Borrowed";
    if (activeTab === "returned") return matchesSearch && transaction.status === "Returned";
    
    return matchesSearch;
  });

  return (
    <MainLayout>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search transactions..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              New Borrowing
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
              <TabsTrigger value="returned">Returned</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all borrowing transactions</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Item No.</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Date Borrowed</TableHead>
                  <TableHead>Date Returned</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.transactionType}</TableCell>
                    <TableCell className="font-medium">{transaction.itemNo}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.borrower}</TableCell>
                    <TableCell>{transaction.borrowDate}</TableCell>
                    <TableCell>{transaction.returnDate || "-"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "Returned" 
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.status === "Borrowed" ? (
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Check size={14} />
                          Return
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Returned
                        </Button>
                      )}
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

export default BorrowingPage;
