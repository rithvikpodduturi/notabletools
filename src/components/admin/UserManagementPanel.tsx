
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Search, UserCog, UserCheck, UserX, Edit, Ban, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";

const UserManagementPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Simulated user data
  const users = [
    {
      id: "user1",
      name: "Jane Smith",
      username: "jane.smith",
      email: "jane.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      role: "Admin",
      status: "Active",
      joinDate: new Date(2023, 1, 15),
      lastActive: new Date(2023, 5, 20),
    },
    {
      id: "user2",
      name: "John Doe",
      username: "john.doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      role: "Maker",
      status: "Active",
      joinDate: new Date(2023, 2, 5),
      lastActive: new Date(2023, 5, 19),
    },
    {
      id: "user3",
      name: "Alex Johnson",
      username: "alex.johnson",
      email: "alex.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      role: "User",
      status: "Suspended",
      joinDate: new Date(2023, 3, 10),
      lastActive: new Date(2023, 5, 1),
    },
  ];
  
  const handleSuspend = (id: string) => {
    toast({
      title: "User suspended",
      description: "The user has been suspended and cannot access the platform.",
      variant: "destructive",
    });
  };
  
  const handleActivate = (id: string) => {
    toast({
      title: "User activated",
      description: "The user has been activated and can now access the platform.",
    });
  };
  
  const handlePromote = (id: string) => {
    toast({
      title: "Role updated",
      description: "The user's role has been updated successfully.",
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5 text-primary" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage user accounts, roles, and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Add User</Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.role === "Admin" ? "bg-primary/10 text-primary border-primary/20" :
                        user.role === "Maker" ? "bg-violet-100 text-violet-800 border-violet-200" :
                        "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {user.role === "Admin" && <Shield className="h-3 w-3 mr-1" />}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "outline" : "destructive"}
                      className={
                        user.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" : ""
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.joinDate)}</TableCell>
                  <TableCell>{formatDate(user.lastActive)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePromote(user.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.status === "Active" ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleSuspend(user.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-600"
                          onClick={() => handleActivate(user.id)}
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagementPanel;
