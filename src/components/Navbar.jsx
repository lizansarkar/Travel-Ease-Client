import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-vehicles">All Vehicles</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/add-vehicle">Add Vehicle</NavLink>
          </li>
          <li>
            <NavLink to="/my-vehicle">My Vehicles</NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings">My Bookings</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-base-200">
      <div className="navbar container">
        <div className="navbar-start">
          <div className="dropdown">
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="flex items-center justify-center cursor-pointer">
            <img
              src="/src/assets/icon1.png"
              alt=""
              className="h-15"
            />
            <h1 className="font-bold text-xl md:text-2xl">TravelEase</h1>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <div
                className="avatar tooltip tooltip-bottom"
                data-tip={user?.displayName || "User"}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt={user?.displayName || "User"}
                      src={user?.photoURL}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* logout button */}
              <button
                onClick={handleSignOut}
                className="btn bg-black text-secondary"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <NavLink className="btn bg-black text-secondary" to="/login">
                Login
              </NavLink>
              <div className="divider lg:divider-horizontal"></div>
              <NavLink className="btn btn-outline btn-neutral" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
