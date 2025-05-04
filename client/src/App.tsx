import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthGuard from "./AuthGuard";
import Layout from "./layout";
import UserListPage from "./pages/User";
import UserCreatePage from "./pages/User/screen/UserCreate";
import UserDetailPage from "./pages/User/screen/UserDetail";
import UserEditPage from "./pages/User/screen/UserEdit";

const ProtectedLayout = () => (
  <AuthGuard>
    <Layout>
      <Outlet />
    </Layout>
  </AuthGuard>
);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/create" element={<UserCreatePage />} />
          <Route path="/users/:id/edit" element={<UserEditPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
