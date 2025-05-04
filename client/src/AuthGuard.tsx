// components/AuthGuard.tsx
import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: JSX.Element;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const isAuthenticated = !!sessionStorage.getItem("authToken");

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default AuthGuard;
