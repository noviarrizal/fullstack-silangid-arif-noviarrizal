import { PageHeader } from "@/components/PageHeader";
import { useParams } from "react-router-dom";
import { useInitHooks } from "../hooks/useInitHooks";
import { useEffect } from "react";
import UserFormEdit from "../components/UserFormEdit";


const UserEditPage = () => {
    const { id } = useParams();
    const { getUserDetail} = useInitHooks();

    useEffect(() => {
        getUserDetail.mutate(id ?? "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  return (
    <>
      <PageHeader
        title="Edit User"
        description="Edit a user to the system"
        backLink="/users"
      />
      
      <div className="max-w-2xl mx-auto">
        <UserFormEdit />
      </div>
    </>
  );
}

export default UserEditPage;
