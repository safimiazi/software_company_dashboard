import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";
import Sidebar from "../components/common/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header />
        {/* Scrollable content */}
        <div className="flex-1 p-6 overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
