import Dashboard from "../pages/Dashboard/Dashboard";
import Home_about from "../pages/home_page/Home_about";
import Home_banner from "../pages/home_page/Home_banner";
import Home_services from "../pages/home_page/Home_services";
import Project from "../pages/project/Project";
import Section_header from "../pages/section_header/Section_header";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Services",
    path: "services",
    element: <Home_services />,
  },
  {
    name: "Projects",
    path: "projects",
    element: <Project />,
  },
  {
    name: "Section header",
    path: "section-header",
    element: <Section_header />,
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

    ],
  },
];
