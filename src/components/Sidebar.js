import React from "react";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling

const Sidebar = ({ isOpen, toggleSidebar, username }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <ul>
          {/* Only highlight the Dashboard link when exactly on /dashboard */}
          <li>
            <NavLink
              to="/dashboard"
              end // Ensure it matches exactly
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/transactions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Username and Logout button at the bottom of the sidebar for small screens */}
      <div className="sidebar-footer">
        <p className="header-username">
          Logged in as:{" "}
          <strong>
            <span className="username">{username}</span>
          </strong>
        </p>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("username");
            localStorage.removeItem("accessToken");
            window.location.href = "/"; // Redirect to login page
          }}
        >
          <span>
            <MdLogout size={24} />
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
