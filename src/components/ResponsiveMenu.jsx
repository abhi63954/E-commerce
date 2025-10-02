import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function ResponsiveMenu({ openNav, setOpenNav }) {
  const { user } = useUser();
  const btnRef = useRef(null);
  const signOutBtn = useRef(null);

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[70%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-rxl shadow-md transition-all`}
    >
      <div>
        <div className="flex items-center justify-start gap-3">
          {user ? <UserButton size={50} /> : <FaUserCircle size={50} />}
          <SignedOut>
            <SignInButton
              className="hidden bg-red-500 text-white px-3 py-1 rounded-2xl cursor-pointer"
              ref={btnRef}
            />
          </SignedOut>

          
          <div
            onClick={() => {
              if (btnRef.current && !user) btnRef.current.click();
             
            }}
          >
            <h1>Hello, {user?.firstName || "Guest"}</h1>
            <h1 className="text-sm text-slate-500 ">Premium User</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <NavLink
              to={"/"}
              className=" cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className=" cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className=" cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className=" cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Contact</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ResponsiveMenu;
