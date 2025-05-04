import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import UserList from "./components/UserList";

const UserListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage all users in the system"
        actions={
          <Link to="/users/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Button>
          </Link>
        }
      />

      <div className="mb-4 w-full md:w-72">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <UserList searchQuery={searchQuery} />
    </>
  );
}

export default UserListPage;
