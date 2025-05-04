/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Users } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInitHooks } from "./hooks/useInitHooks";
import Lottie from "lottie-react";
import LoaderAnimation from "../../assets/anim/loader.json";

const Home = () => {
  const { getListUser, userList, isLoading } = useInitHooks();

  useEffect(() => {
    getListUser.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome to the User Management System"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Lottie
                    animationData={LoaderAnimation}
                    style={{ height: 50 }}
                  />
                ) : (
                  userList?.length || 0
                )}
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Link to="/users">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
              <Link to="/users/create">
                <Button className="w-full justify-start" variant="outline">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Create New User
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Home;
