import { Button } from "@/components/ui/button";
import { AlertCircle, Edit, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserDetail from "../components/UserDetail";
import { useEffect } from "react";
import { useInitHooks } from "../hooks/useInitHooks";

const UserDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUserDetail, isLoading, userDetail } = useInitHooks();

  useEffect(() => {
    getUserDetail.mutate(id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!userDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h2 className="text-xl font-semibold">User not found</h2>
        <p className="text-muted-foreground">
          The user you are looking for does not exist or has been deleted.
        </p>
        <Button onClick={() => navigate("/users")}>Return to Users</Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="User Details"
        backLink="/users"
        actions={
          <Link to={`/users/${userDetail.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Button>
          </Link>
        }
      />

      <UserDetail user={userDetail} />
    </>
  );
};

export default UserDetailPage;
