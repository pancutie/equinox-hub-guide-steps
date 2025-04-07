
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
import { Search, ArrowLeft, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from a database
const initialBooks = [
  { id: 2, bookNo: "B1002", title: "Advanced Web Development", author: "Sarah Jones", location: "Shelf B", year: 2021, borrower: "Juan Dela Cruz", borrowDate: "2023-03-15", dueDate: "2023-04-15", returned: false },
  { id: 5, bookNo: "B1005", title: "Machine Learning Basics", author: "David Wilson", location: "Shelf B", year: 2020, borrower: "Pedro Reyes", borrowDate: "2023-03-20", dueDate: "2023-04-20", returned: false },
  { id: 7, bookNo: "B1007", title: "Software Engineering", author: "Robert Johnson", location: "Shelf C", year: 2021, borrower: "Carlos Tan", borrowDate: "2023-03-12", dueDate: "2023-04-12", returned: false },
];

const BorrowedBooksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState(initialBooks);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredBooks = books.filter(book => 
    !book.returned && (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.borrower.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const isOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  const handleReturn = (id: number) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, returned: true } : book
    ));
    
    toast({
      title: "Book Returned",
      description: "The book has been marked as returned and is now available for borrowing.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/reports')}
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Borrowed Books Report</h2>
      </div>
      
      <Card className="mb-6 border shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="relative w-full md:w-1/3 mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search books or borrowers..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border overflow-hidden shadow-sm dark:border-gray-700">
            <Table>
              <TableCaption>List of all borrowed books</TableCaption>
              <TableHeader className="bg-gray-50 dark:bg-gray-900">
                <TableRow>
                  <TableHead>Book No.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Date Borrowed</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => {
                    const overdueStatus = isOverdue(book.dueDate);
                    
                    return (
                      <TableRow key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <TableCell className="font-medium">{book.bookNo}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.borrower}</TableCell>
                        <TableCell>{book.borrowDate}</TableCell>
                        <TableCell>{book.dueDate}</TableCell>
                        <TableCell>
                          {overdueStatus ? (
                            <div className="flex items-center gap-1">
                              <AlertTriangle size={14} className="text-red-500" />
                              <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                Overdue
                              </span>
                            </div>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                              Borrowed
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1 hover:bg-green-50 hover:text-green-600 hover:border-green-200 dark:hover:bg-green-900 dark:hover:text-green-400"
                            onClick={() => handleReturn(book.id)}
                          >
                            <Check size={14} />
                            Return
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No borrowed books found. All books have been returned.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default BorrowedBooksPage;
