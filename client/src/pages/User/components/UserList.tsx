import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DeleteUserDialog from "./DeleteUserDialog";
import { useInitHooks } from "../hooks/useInitHooks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Loader2 } from "lucide-react";
import { User } from "@/lib/api/homeService/homeServiceResponse";

interface UserListProps {
  searchQuery?: string;
}

const UserList = ({ searchQuery = "" }: UserListProps) => {
  const { getListUser, userList, isLoading } = useInitHooks();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;


  useEffect(() => {
    getListUser.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    if (isLoading) {
      return (
        <div className="flex justify-center my-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!userList?.length) {
      return (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold">No users found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                There are no users in the system yet.
              </p>
              <Button className="mt-4" asChild>
                <Link to="/users/create">Create User</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    const filteredUsers = userList.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    const totalPages = Math.ceil(filteredUsers.length / pageSize);

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">#{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-primary"
                      >
                        <Link to={`/users/${user.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {totalPages > 1 && (
          <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(page * pageSize, filteredUsers.length)}
              </span>{" "}
              of <span className="font-medium">{filteredUsers.length}</span> results
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      <DeleteUserDialog
        open={!!userToDelete}
        user={userToDelete}
        onClose={() => setUserToDelete(null)}
      />
    </>
  );
};

export default UserList;
