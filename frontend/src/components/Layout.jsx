import React from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout as logoutAPI } from "../services/apiService"; // Import your logout function

const Layout = ({ children }) => {
  const token = Cookies.get("company");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAPI();
      Cookies.remove("company");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="max-h-screen bg-gray-100 overflow-hidden">
      <header
        className={`fixed top-0 left-0 right-0  z-10${
          token && " bg-white border-b border-gray-300 shadow-sm"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600 ">
            <Link to={"/dashboard"}>
              <img src="/cuvettIcon.svg" alt="Cuvett Icon" className="h-8" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            {token && (
              <div className="relative border p-1 border-gray-400 rounded-md">
                <button
                  className="flex gap-2 items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={handleLogout} // Call the handleLogout function on click
                >
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {token && (
        <aside className="fixed top-[4.15rem] left-0 w-16 h-screen bg-white shadow-md border border-r-gray-200 z-10">
          <nav className="mt-5">
            <Link to={"/dashboard"} className="block p-3">
              <HomeIcon className="w-6 h-6 text-gray-500 hover:text-blue-600" />
            </Link>
          </nav>
        </aside>
      )}
      <main className="flex-1 mt-16 ml-16 h-screen overflow-y-auto card">
        {children}
      </main>
    </div>
  );
};

export default Layout;
