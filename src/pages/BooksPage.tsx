
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
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import AddBookDialog from "@/components/books/AddBookDialog";
import EditBookDialog from "@/components/books/EditBookDialog";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

// Book data structure
export interface Book {
  id: number;
  bookNo: string;
  title: string;
  author: string;
  location: string;
  year: number;
  status: "Available" | "Borrowed";
}

// Mock data - in a real app, this would come from a database
const initialBooks = [
  { id: 1, bookNo: "B1001", title: "Introduction to Database", author: "John Smith", location: "Shelf A", year: 2020, status: "Available" as const },
  { id: 2, bookNo: "B1002", title: "Advanced Web Development", author: "Sarah Jones", location: "Shelf B", year: 2021, status: "Borrowed" as const },
  { id: 3, bookNo: "B1003", title: "Database Management", author: "Robert Johnson", location: "Shelf A", year: 2019, status: "Available" as const },
  { id: 4, bookNo: "B1004", title: "Artificial Intelligence", author: "Michael Brown", location: "Shelf C", year: 2022, status: "Available" as const },
  { id: 5, bookNo: "B1005", title: "Machine Learning Basics", author: "David Wilson", location: "Shelf B", year: 2020, status: "Borrowed" as const },
  { id: 6, bookNo: "B1006", title: "Cybersecurity Fundamentals", author: "Emma Davis", location: "Shelf C", year: 2021, status: "Available" as const },
  { id: 7, bookNo: "B1007", title: "Software Engineering", author: "Robert Johnson", location: "Shelf C", year: 2021, status: "Borrowed" as const },
  { id: 8, bookNo: "B1008", title: "Mobile App Development", author: "Jennifer Lee", location: "Shelf A", year: 2022, status: "Available" as const },
];

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { toast } = useToast();
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add a new book
  const handleAddBook = (book: Omit<Book, 'id'>) => {
    const newBook = {
      ...book,
      id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1
    };
    setBooks([...books, newBook]);
    setIsAddDialogOpen(false);
    toast({
      title: "Book Added",
      description: "New book has been added successfully",
    });
  };

  // Function to edit book
  const handleEditBook = (updatedBook: Book) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
    setIsEditDialogOpen(false);
    toast({
      title: "Book Updated",
      description: "Book has been updated successfully",
    });
  };

  // Function to delete book
  const handleDeleteBook = () => {
    if (selectedBook) {
      setBooks(books.filter(book => book.id !== selectedBook.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Book Deleted",
        description: "Book has been deleted successfully",
      });
    }
  };

  return (
    <MainLayout>
      <Card className="mb-6 border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search for books..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus size={18} />
              Add New Book
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all books in the inventory</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Book No.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.bookNo}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.location}</TableCell>
                      <TableCell>{book.year}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          book.status === "Available" 
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {book.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedBook(book);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedBook(book);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No books found. Try adjusting your search or add a new book.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Book Dialog */}
      <AddBookDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddBook}
      />

      {/* Edit Book Dialog */}
      {selectedBook && (
        <EditBookDialog 
          isOpen={isEditDialogOpen} 
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleEditBook}
          book={selectedBook}
        />
      )}

      {/* Delete Confirm Dialog */}
      {selectedBook && (
        <DeleteConfirmDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteBook}
          title="Delete Book"
          description={`Are you sure you want to delete "${selectedBook.title}"? This action cannot be undone.`}
        />
      )}
    </MainLayout>
  );
};

export default BooksPage;
