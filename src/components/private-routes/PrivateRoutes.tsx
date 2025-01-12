import React from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Role } from "../../features/auth/types/auth.type";

interface PrivateRoutesProps {
  roles: Role[];
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ roles, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/access-denied" />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/access-denied" />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
