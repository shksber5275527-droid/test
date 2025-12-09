import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

const Protectedroutes = () => {
  const { isAuthenticated ,isLoading} = useAuth();
  
if (isLoading) {
    return <ClipLoader /> 
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protectedroutes;
