import { Navigate } from "react-router-dom";
const isAuthenticated = () => {
  return localStorage.getItem("authToken") ? false : true;
};

const ProtectedRoute = ({ children }: any) => {
  if (!isAuthenticated()) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
