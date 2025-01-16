import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import App from "../App";

const AppRoutes = () => {
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App}/>
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
