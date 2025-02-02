import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetAdminDataQuery } from "../redux/api/adminApi/authApi/AuthApi.query";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data,isLoading } = useGetAdminDataQuery({});
if(isLoading){
  return <div>Loading</div>
}
 
  if (!data) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
