import Dashboard from "../pages/Dashboard/Dashboard";
import Home_about from "../pages/home_page/Home_about";
import Home_banner from "../pages/home_page/Home_banner";
import Home_services from "../pages/home_page/Home_services";

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
      {
        name: "About",
        path: "about",
        element: <Home_about />,
      },
      {
        name: "Services",
        path: "services",
        element: <Home_services />,
      },
    ],
  },
];
