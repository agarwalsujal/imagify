import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setShowLogin, logout , credit } = useContext(AppContext); // Assuming AppContext is imported
  const [hover, setHover] = useState(false);
  const [creditHover, setCreditHover] = useState(false);
   
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* ✅ Credits Button */}
            <button 
              onClick={() => navigate("/buy")}
              onMouseEnter={() => setCreditHover(true)}
              onMouseLeave={() => setCreditHover(false)}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full transition-all duration-300"
              style={{
                transform: creditHover ? "scale(1.05)" : "scale(1)",
                willChange: "transform",
              }}
            >
              <img src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left: {credit ? credit : "0"}
              </p>
            </button>

            <p className="text-gray-600 max-sm:hidden:h pl-4">Hi, {user ? user.name : "Guest"}</p>

            {/* Profile Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow cursor-pointer"
                alt=""
              />
              <div
                className={`absolute top-0 right-0 z-10 text-black rounded pt-12 ${
                  hover ? "block" : "hidden"
                }`}
              >
                <ul className="bg-white shadow rounded">
                  <li onClick={logout} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                    LogOut
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true) }
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm  cursor-pointer rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
