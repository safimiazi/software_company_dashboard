import { useDispatch } from "react-redux";
import { sidebarToggle } from "../../../redux/slices/sidebarSlice";
import { FaBars } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { useGetAdminDataQuery } from "../../../redux/api/adminApi/authApi/AuthApi.query";

const Header = () => {
  const dispatch = useDispatch();
 const {data}= useGetAdminDataQuery({})
console.log(data)
  return (
    <header className="h-20 w-full flex items-center justify-between bg-white text-gray-800 px-4 lg:px-6 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <FaBars
          className="text-2xl cursor-pointer lg:hidden text-[#FF3C00]"
          onClick={() => dispatch(sidebarToggle())}
        />
        <h1 className="text-xl font-semibold text-[#FF3C00]">Dashboard</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        {/* Notifications Icon */}
        <button className="relative text-xl text-gray-800 hover:text-[#FF3C00] transition duration-200">
          <MdNotifications />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF3C00] rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <img
            src={"/user.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-gray-800">{data?.data?.name}</p>
            <p className="text-xs text-gray-500">{data?.data?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
