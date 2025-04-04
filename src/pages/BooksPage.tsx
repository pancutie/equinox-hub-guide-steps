
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
import { Search, Plus } from "lucide-react";

// Mock data - in a real app, this would come from a database
const mockBooks = [
  { id: 1, bookNo: "B1001", title: "Introduction to Programming", author: "John Smith", location: "Shelf A", year: 2020, status: "Available" },
  { id: 2, bookNo: "B1002", title: "Advanced Web Development", author: "Sarah Jones", location: "Shelf B", year: 2021, status: "Borrowed" },
  { id: 3, bookNo: "B1003", title: "Database Management", author: "Michael Brown", location: "Shelf A", year: 2019, status: "Available" },
  { id: 4, bookNo: "B1004", title: "Algorithms and Data Structures", author: "Emily Clark", location: "Shelf C", year: 2022, status: "Available" },
  { id: 5, bookNo: "B1005", title: "Machine Learning Basics", author: "David Wilson", location: "Shelf B", year: 2020, status: "Borrowed" },
  { id: 6, bookNo: "B1006", title: "Computer Networks", author: "Jessica Martin", location: "Shelf D", year: 2018, status: "Available" },
  { id: 7, bookNo: "B1007", title: "Software Engineering", author: "Robert Johnson", location: "Shelf C", year: 2021, status: "Borrowed" },
  { id: 8, bookNo: "B1008", title: "Cloud Computing", author: "Patricia Miller", location: "Shelf D", year: 2022, status: "Available" },
];

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBooks = mockBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <Card className="mb-6">
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
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              Add New Book
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all books in the library</TableCaption>
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
                {filteredBooks.map((book) => (
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
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
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

export default BooksPage;
