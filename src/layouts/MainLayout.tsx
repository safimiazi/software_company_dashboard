import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";
import Sidebar from "../components/common/Sidebar/Sidebar";
import OutletWrapper from "../utils/OutletWrapper";

const MainLayout = () => {
  return (
    <div className="flex w-full ">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex-1">
        <Header />
        {/* Scrollable content */}
        <div className=" overflow-auto">
          <OutletWrapper>
          <Outlet />
          </OutletWrapper>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
