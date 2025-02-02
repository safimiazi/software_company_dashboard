import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

const AppRoutes = () => {
  const data = true;

  return (
    <BrowserRouter>
      {data ? (
        <AdminLayout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
            <Route
              index={true}
              path="dashboard"

              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AdminLayout>
      ) : (
        <Navigate replace to={"/login"} />
      )}
    </BrowserRouter>
  );
};

export default AppRoutes;
