import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const AuthData = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = AuthData;
  console.log("🚀 ~ PrivateRoutes ~ loading:", loading);
  console.log("🚀 ~ PrivateRoutes ~ isAuthenticated:", isAuthenticated);

  return (
    <>
      {isAuthenticated && !loading ? <Outlet /> : <Navigate to={"/signin"} />}
    </>
  );
};
