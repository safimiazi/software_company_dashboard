import { Navigate } from "react-router-dom";
const isAuthenticated = () => {
  return localStorage.getItem("authToken") ? true : false;
};

const ProtectedRoute = ({ children }: any) => {
  if (!isAuthenticated()) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
