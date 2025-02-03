import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children:routeGenerator(adminPaths)
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;
