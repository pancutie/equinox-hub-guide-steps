
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
import { Search, UserPlus, Edit, Trash2, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddUserDialog from "@/components/users/AddUserDialog";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usersList, setUsersList] = useState(borrowers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const { toast } = useToast();
  
  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (newUser: any) => {
    setUsersList([...usersList, newUser]);
    setIsAddDialogOpen(false);
    
    // Play a soft notification sound
    const audio = new Audio('/notification.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));

    toast({
      title: "User added",
      description: `${newUser.name} has been added to the system.`,
    });
  };
  
  const handleEdit = (user: any) => {
    setEditingUser({...user});
    setIsEditDialogOpen(true);
  };
  
  const saveEditedUser = () => {
    if (editingUser) {
      const updatedUsers = usersList.map(user => 
        user.id === editingUser.id ? editingUser : user
      );
      setUsersList(updatedUsers);
      
      toast({
        title: "User updated",
        description: `${editingUser.name}'s information has been updated.`,
      });
      
      setIsEditDialogOpen(false);
      setEditingUser(null);
    }
  };
  
  const confirmDelete = (userId: number) => {
    setDeleteUserId(userId);
  };
  
  const handleDelete = () => {
    if (deleteUserId) {
      const userToDelete = usersList.find(user => user.id === deleteUserId);
      setUsersList(usersList.filter(user => user.id !== deleteUserId));
      toast({
        title: "User deleted",
        description: `${userToDelete?.name} has been removed from the system.`,
      });
      setDeleteUserId(null);
    }
  };
  
  const handleSendReminder = (userName: string) => {
    toast({
      title: "Reminder sent",
      description: `A reminder has been sent to ${userName}.`,
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <Card className="border-none shadow-md dark:bg-gray-800/50 dark:border-none">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl text-purple-800 dark:text-purple-300 font-bold">Registered Users</CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-400">
                  Manage all registered users in the system
                </CardDescription>
              </div>
              <Button 
                className="bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" /> Add New User
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 dark:bg-gray-800/50">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input 
                placeholder="Search users by name or role..." 
                className="pl-10 border-purple-100 focus-visible:ring-purple-500 dark:bg-gray-800 dark:border-purple-800 dark:text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border dark:border-purple-800 overflow-hidden">
              <Table>
                <TableCaption className="dark:text-gray-400">A list of all registered users in the system.</TableCaption>
                <TableHeader className="bg-purple-50 dark:bg-purple-900/30">
                  <TableRow className="dark:border-purple-800">
                    <TableHead className="w-[50px] dark:text-purple-300">ID</TableHead>
                    <TableHead className="dark:text-purple-300">Name</TableHead>
                    <TableHead className="dark:text-purple-300">Role</TableHead>
                    <TableHead className="text-center dark:text-purple-300">Items Borrowed</TableHead>
                    <TableHead className="text-center dark:text-purple-300">Overdue Items</TableHead>
                    <TableHead className="text-right dark:text-purple-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="dark:bg-gray-800">
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-purple-50/50 dark:hover:bg-purple-900/20 dark:border-purple-800">
                      <TableCell className="font-medium dark:text-gray-300">{user.id}</TableCell>
                      <TableCell className="font-medium dark:text-gray-300">{user.name}</TableCell>
                      <TableCell>
                        <Badge 
                          className={user.role === "Faculty" 
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200" 
                            : user.role === "Staff"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200"}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center dark:text-gray-300">{user.borrowed}</TableCell>
                      <TableCell className="text-center">
                        {user.overdue > 0 ? (
                          <Badge variant="destructive">{user.overdue}</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300">0</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.overdue > 0 && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900/30"
                              onClick={() => handleSendReminder(user.name)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/30"
                            onClick={() => confirmDelete(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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
      </div>
      
      {/* Add User Dialog */}
      <AddUserDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
        onSuccess={handleAddUser}
      />
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => !open && setIsEditDialogOpen(false)}>
        <DialogContent className="dark:bg-gray-800 dark:border-purple-800">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Edit User</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Update user information below.
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="dark:text-gray-300">Name</Label>
                <Input
                  id="edit-name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role" className="dark:text-gray-300">Role</Label>
                <select
                  id="edit-role"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button 
              onClick={saveEditedUser}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteUserId !== null} onOpenChange={(open) => !open && setDeleteUserId(null)}>
        <AlertDialogContent className="dark:bg-gray-800 dark:border-purple-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-300">
              This action cannot be undone. This will permanently delete the user
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default UsersPage;
