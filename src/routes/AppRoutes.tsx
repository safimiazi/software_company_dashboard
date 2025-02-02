import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Login from "../pages/Login/Login";

const AppRoutes = () => {
  const data = false;

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
        <Routes>
        <Route
          path="/login"
          element={
            <Login/>
          }
        /> </Routes>
      )}
    </BrowserRouter>
  );
};

export default AppRoutes;
