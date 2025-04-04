
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
import { Search, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data - in a real app, this would come from a database
const mockBooks = [
  { id: 1, bookNo: "B1001", title: "Introduction to Programming", author: "John Smith", location: "Shelf A", year: 2020 },
  { id: 3, bookNo: "B1003", title: "Database Management", author: "Michael Brown", location: "Shelf A", year: 2019 },
  { id: 4, bookNo: "B1004", title: "Algorithms and Data Structures", author: "Emily Clark", location: "Shelf C", year: 2022 },
  { id: 6, bookNo: "B1006", title: "Computer Networks", author: "Jessica Martin", location: "Shelf D", year: 2018 },
  { id: 8, bookNo: "B1008", title: "Cloud Computing", author: "Patricia Miller", location: "Shelf D", year: 2022 },
];

const AvailableBooksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredBooks = mockBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/reports')}
        >
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-2xl font-bold">Available Books Report</h2>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative w-full md:w-1/3 mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search books..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all available books</TableCaption>
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
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Available
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Borrow</Button>
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

export default AvailableBooksPage;
