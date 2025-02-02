import Dashboard from "../pages/Dashboard/Dashboard";
import Home_banner from "../pages/home_page/Home_banner";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Home Page",
    children: [
      {
        name: "Banner",
        path: "banner",
        element: <Home_banner />,
      },
    ],
  },
];
