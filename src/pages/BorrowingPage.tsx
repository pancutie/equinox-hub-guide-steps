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
import { Search, Plus, Edit, Trash2, Calendar, ArrowRight, ArrowDown } from "lucide-react";
import AddBorrowingDialog from "@/components/borrowing/AddBorrowingDialog";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

export interface Transaction {
  id: number;
  transactionType: "Book" | "Equipment";
  itemNo: string;
  description: string;
  borrower: string;
  borrowDate: string;
  returnDate: string | null;
  status: "Borrowed" | "Returned";
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    transactionType: "Book",
    itemNo: "B1001",
    description: "Introduction to Computer Science",
    borrower: "Maria Santos",
    borrowDate: "2023-05-15",
    returnDate: "2023-05-30",
    status: "Returned"
  },
  {
    id: 2,
    transactionType: "Equipment",
    itemNo: "E1002",
    description: "Projector",
    borrower: "Juan Dela Cruz",
    borrowDate: "2023-06-10",
    returnDate: null,
    status: "Borrowed"
  },
  {
    id: 3,
    transactionType: "Book",
    itemNo: "B1003",
    description: "Advanced Web Development",
    borrower: "Carlos Tan",
    borrowDate: "2023-07-05",
    returnDate: null,
    status: "Borrowed"
  },
  {
    id: 4,
    transactionType: "Equipment",
    itemNo: "E1003",
    description: "Laboratory Kit",
    borrower: "Ana Gonzales",
    borrowDate: "2023-07-20",
    returnDate: "2023-08-15",
    status: "Returned"
  },
  {
    id: 5,
    transactionType: "Book",
    itemNo: "B1005",
    description: "Software Engineering",
    borrower: "Sofia Lim",
    borrowDate: "2023-08-01",
    returnDate: null,
    status: "Borrowed"
  }
];

const BorrowingPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const { toast } = useToast();

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.itemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: transactions.length ? Math.max(...transactions.map((t) => t.id)) + 1 : 1,
    };
    setTransactions([...transactions, newTransaction]);
    toast({
      title: "Transaction Added",
      description: "New borrowing transaction has been added successfully",
    });
  };

  const handleDeleteTransaction = () => {
    if (selectedTransaction) {
      setTransactions(transactions.filter((item) => item.id !== selectedTransaction.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Transaction Deleted",
        description: "Borrowing transaction has been deleted successfully",
      });
    }
  };

  const handleReturnItem = (transaction: Transaction) => {
    const updatedTransactions = transactions.map((item) => {
      if (item.id === transaction.id) {
        return {
          ...item,
          status: "Returned" as const,
          returnDate: new Date().toISOString().split("T")[0],
        };
      }
      return item;
    });
    setTransactions(updatedTransactions);
    toast({
      title: "Item Returned",
      description: `${transaction.description} has been marked as returned`,
    });
  };

  return (
    <MainLayout>
      <Card className="mb-6 border shadow-sm bg-white dark:bg-gray-900">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search borrowing transactions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus size={18} />
              New Borrowing
            </Button>
          </div>

          <div className="rounded-md border overflow-hidden shadow-sm">
            <Table>
              <TableCaption className="dark:text-gray-400">List of all borrowing transactions</TableCaption>
              <TableHeader className="bg-gray-50 dark:bg-gray-800">
                <TableRow className="dark:border-gray-700">
                  <TableHead className="dark:text-gray-300">Item No.</TableHead>
                  <TableHead className="dark:text-gray-300">Description</TableHead>
                  <TableHead className="dark:text-gray-300">Type</TableHead>
                  <TableHead className="dark:text-gray-300">Borrower</TableHead>
                  <TableHead className="dark:text-gray-300">Borrow Date</TableHead>
                  <TableHead className="dark:text-gray-300">Return Date</TableHead>
                  <TableHead className="dark:text-gray-300">Status</TableHead>
                  <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="dark:bg-gray-900">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-50">
                      <TableCell className="font-medium dark:text-gray-300">{transaction.itemNo}</TableCell>
                      <TableCell className="dark:text-gray-300">{transaction.description}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.transactionType === "Book"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          }`}
                        >
                          {transaction.transactionType}
                        </span>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">{transaction.borrower}</TableCell>
                      <TableCell className="dark:text-gray-300">{transaction.borrowDate}</TableCell>
                      <TableCell className="dark:text-gray-300">{transaction.returnDate || "Not returned"}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "Returned"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {transaction.status === "Borrowed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                            onClick={() => handleReturnItem(transaction)}
                          >
                            <ArrowDown size={16} className="mr-1" />
                            Return
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No transactions found. Try adjusting your search or add a new borrowing transaction.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddBorrowingDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddTransaction}
      />

      {selectedTransaction && (
        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteTransaction}
          title="Delete Transaction"
          description={`Are you sure you want to delete the borrowing record for "${selectedTransaction.description}"? This action cannot be undone.`}
        />
      )}
    </MainLayout>
  );
};

export default BorrowingPage;
