import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { sidebarToggle } from "../../../redux/slices/sidebarSlice";

const Sidebar = () => {
  const open = useSelector((state: RootState) => state.sidebar.open);
  const dispatch = useDispatch();

  return (
    <div
      className={`lg:static fixed left-0 top-0 bg-white text-gray-800 w-64 min-h-screen lg:translate-x-0 z-40 shadow-lg ${
        open
          ? "translate-x-0 transition-transform duration-500"
          : "-translate-x-96 transition-transform duration-500"
      }`}
    >
      <div className="w-full h-full relative">
        {/* Close Button for Mobile */}
        <div
          onClick={() => dispatch(sidebarToggle())}
          className="absolute lg:hidden p-2 bg-gray-300 text-gray-800 text-2xl rounded-full -right-7 top-4 cursor-pointer hover:bg-gray-400"
        >
          <MdOutlineCancelPresentation />
        </div>

        {/* Logo Section */}
        <div className="p-6 text-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#FF3C00]">My App</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <a
                href="#home"
                className="flex items-center gap-4 px-6 py-3 hover:bg-[#FF3C00] hover:text-white transition-colors duration-200 rounded-md"
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="#profile"
                className="flex items-center gap-4 px-6 py-3 hover:bg-[#FF3C00] hover:text-white transition-colors duration-200 rounded-md"
              >
                <FaUser className="text-lg" />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className="flex items-center gap-4 px-6 py-3 hover:bg-[#FF3C00] hover:text-white transition-colors duration-200 rounded-md"
              >
                <FaCog className="text-lg" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a
                href="#logout"
                className="flex items-center gap-4 px-6 py-3 text-white bg-red-500 hover:bg-red-700 transition-colors duration-200 rounded-md"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
