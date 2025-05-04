import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteUserDialog from "./DeleteUserDialog";
import { formatDistanceToNow } from "date-fns";
import { IUser } from "@/lib/api/homeService/homeServiceResponse";

interface UserDetailProps {
  user: IUser;
}

const UserDetail = ({ user }: UserDetailProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // const getInitials = (name: string) => {
  //   return name
  //     .split(' ')
  //     .map(part => part.charAt(0))
  //     .join('')
  //     .toUpperCase();
  // };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="text-center">
                <h4 className="text-lg font-medium">{user.name}</h4>
                <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mt-2">
                  Active
                </span>
              </div>
            </div>

            <div className="md:w-2/3 md:pl-8">
              <div className="grid grid-cols-1 gap-4">
                <div className="border-b pb-3 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-medium">#{user.id}</p>
                </div>

                <div className="border-b pb-3 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>

                <div className="border-b pb-3 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="font-medium">
                    {user.created_at
                      ? formatDistanceToNow(new Date(user.created_at), {
                          addSuffix: true,
                        })
                      : "Not available"}
                  </p>
                </div>

                <div className="pb-3">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="inline-flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                    <span className="font-medium">Active</span>
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteUserDialog
        open={showDeleteDialog}
        user={user ?? ""}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
};

export default UserDetail;
