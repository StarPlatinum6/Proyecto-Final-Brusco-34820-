import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ user, redirectPath = "/", children }) => {
  const location = useLocation();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      setUserLoaded(true);
    }
  }, [user]);

  if (!userLoaded) {
    return null;
  }

  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
