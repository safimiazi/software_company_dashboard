import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { sidebarToggle } from "../../../redux/slices/sidebarSlice";
import { useAdminLogoutMutation } from "../../../redux/api/adminApi/authApi/AuthApi.mutation";
import { useNavigate } from "react-router-dom";
import { adminPaths } from "../../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";

const userRole = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
};

const Sidebar = () => {
  const open = useSelector((state: RootState) => state.sidebar.open);
  const dispatch = useDispatch();
  const [adminLogout] = useAdminLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await adminLogout({}).unwrap(); // Unwraps the response for better error handling

      if (result?.success) {
        // Redirect to login page after successful logout
        navigate("/login");
      }
    } catch (error: unknown) {
      console.error(
        "Logout failed:",
        (error as { message: string })?.message || error
      );
    }
  };

  let sidebarItems;

  switch ("admin") {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    default:
      break;
  }

  return (
    <div
      className={`lg:sticky fixed left-0 top-0 bg-white text-gray-800 w-64 h-screen  overflow-y-auto lg:translate-x-0 z-40 shadow-lg ${
        open
          ? "translate-x-0 transition-transform duration-500"
          : "-translate-x-96 transition-transform duration-500"
      }`}
    >
      <div className="w-full h-full relative border ">
        {/* Close Button for Mobile */}
        <div
          onClick={() => dispatch(sidebarToggle())}
          className="absolute lg:hidden p-2 bg-gray-300 text-gray-800 text-2xl rounded-full right-2 top-2 cursor-pointer hover:bg-gray-400"
        >
          <MdOutlineCancelPresentation />
        </div>

        {/* Logo Section */}
        <div className="p-6 text-center border-b border-gray-200 ">
          <h1 className="text-2xl font-bold text-[#FF3C00]">My App</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col h-4/5 ">
          <div className="flex-grow">
            <Sider width={"100%"}>
              <Menu items={sidebarItems} mode="inline" />
            </Sider>
          </div>
          <ul className="space-y-2 px-4 flex-none">
            <li onClick={() => handleLogout()}>
              <div className="flex items-center gap-4 px-6 py-3 text-white bg-red-500 hover:bg-red-700 transition-colors duration-200 rounded-md">
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
