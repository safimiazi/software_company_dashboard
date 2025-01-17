import { ReactNode } from "react";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import Header from "../../components/common/Header/Header";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/*sidebar  */}
      <div>
        <Sidebar />
      </div>
      {/* main */}
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="flex-1 border">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
