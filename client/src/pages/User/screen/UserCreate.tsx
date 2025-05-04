import { PageHeader } from "@/components/PageHeader";
import UserForm from "../components/UserForm";


const UserCreatePage = () => {
  return (
    <>
      <PageHeader
        title="Create User"
        description="Add a new user to the system"
        backLink="/users"
      />
      
      <div className="max-w-2xl mx-auto">
        <UserForm />
      </div>
    </>
  );
}

export default UserCreatePage;
