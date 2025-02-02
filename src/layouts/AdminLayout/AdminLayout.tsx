import { ReactNode } from "react";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import Header from "../../components/common/Header/Header";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex w-full">
      {/*sidebar  */}
        <Sidebar />
      {/* main */}
      <div className=" flex-1 flex flex-col overflow-auto">
        <Header />
        {/* content */}
        <div className="flex-1 p-6">
        {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
