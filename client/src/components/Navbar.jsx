/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/features/userSlice.js";
import { setActiveTab } from "../redux/features/navBarSlice.js";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import DropdownMenu from "@components/DropdownMenu";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { activeTab } = useSelector((state) => state.navBar);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleSignout = () => {
    toast.success("Successfully Logged Out!!!");
    setIsOpen(false);
    setActiveTab(null);
    dispatch(signOutSuccess());
  };
  return (
    <nav
      className="flex flex-col md:flex-row md:items-center w-full md:h-auto h-[calc(100vh-64px)] xl:w-[25%] lg:w-[35%] md:w-[40%] gap-x-4 absolute md:relative top-16 md:top-0 md:p-0 gap-y-4 md:gap-y-0 items-start bg-white md:bg-transparent scale-x-0 md:scale-x-100 origin-right left-0 transition-transform ease-in-out duration-200 md:justify-evenly justify-between p-4"
      id="navBar"
    >
      <div className="flex flex-col md:flex-row gap-y-4 items-start justify-between w-[40%] xl:w-[45%]">
        <Link
          to="/"
          className={`text-base font-semibold text-center transition duration-1000 ease-in-out lg:text-lg text-md hover:underline underline-offset-2 ${
            activeTab === "HOME" ? "underline" : ""
          }`}
          onClick={() => dispatch(setActiveTab("HOME"))}
        >
          Home
        </Link>
        <Link
          to="/explore"
          className={`text-base font-semibold text-center transition duration-1000 ease-in-out lg:text-lg text-md hover:underline underline-offset-2 ${
            activeTab === "EXPLORE" ? "underline" : ""
          }`}
          onClick={() => dispatch(setActiveTab("EXPLORE"))}
        >
          Explore
        </Link>
        {currentUser && (
          <>
            <Link
              to="/profile"
              className={`text-base font-semibold text-center transition duration-1000 ease-in-out lg:text-lg text-md hover:underline underline-offset-2 md:hidden block ${
                activeTab === "PROFILE" ? "underline" : ""
              }`}
              onClick={() => dispatch(setActiveTab("PROFILE"))}
            >
              View Profile
            </Link>
            <Link
              to="/listings"
              className={`text-base font-semibold text-center transition duration-1000 ease-in-out lg:text-lg text-md hover:underline underline-offset-2 md:hidden block ${
                activeTab === "LISTINGS" ? "underline" : ""
              }`}
              onClick={() => dispatch(setActiveTab("LISTINGS"))}
            >
              View Listings
            </Link>
          </>
        )}
      </div>
      {currentUser && (
        <button
          type="button"
          className="p-2 text-center text-white transition duration-200 ease-in-out border-2 border-transparent rounded-sm text-md bg-slate-800 hover:border-slate-900 hover:text-slate-900 hover:bg-transparent md:hidden flex justify-between items-center gap-x-2 mb-4"
          onClick={handleSignout}
        >
          Sign out <FaArrowRight fill="#fff" />
        </button>
      )}
      {currentUser ? (
        <>
          <button
            type="button"
            className="md:block hidden border-none outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={currentUser.profilePhotoURL}
              alt="profilePhoto"
              className="w-14 h-14 rounded-full shadow-lg ring-2 ring-black p-1 ring-opacity-50"
            />
          </button>
          <DropdownMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleSignout={handleSignout}
          />
        </>
      ) : (
        <Link
          to="/signin"
          className="p-2 text-center text-white transition duration-200 ease-in-out border-2 border-transparent rounded-sm lg:font-semibold text-md bg-slate-800 hover:border-slate-900 hover:text-slate-900 hover:bg-transparent"
        >
          Signin / Signup
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
