
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { borrowers } from "./Index";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = borrowers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <Card className="border-none shadow-md">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl text-purple-800 font-bold">Registered Users</CardTitle>
                <CardDescription className="text-purple-700">
                  Manage all registered users in the system
                </CardDescription>
              </div>
              <Button className="bg-purple-700 hover:bg-purple-800">
                <UserPlus className="mr-2 h-4 w-4" /> Add New User
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search users by name or role..." 
                className="pl-10 border-purple-100 focus-visible:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Table>
              <TableCaption>A list of all registered users in the system.</TableCaption>
              <TableHeader className="bg-purple-50">
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Items Borrowed</TableHead>
                  <TableHead className="text-center">Overdue Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-purple-50/50">
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge 
                        className={user.role === "Faculty" 
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                          : "bg-green-100 text-green-800 hover:bg-green-200"}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{user.borrowed}</TableCell>
                    <TableCell className="text-center">
                      {user.overdue > 0 ? (
                        <Badge variant="destructive">{user.overdue}</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-800">0</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UsersPage;
