import React from "react";
import { MdLogout } from "react-icons/md";
// Sidebar styles

const Sidebar = ({ isOpen, toggleSidebar, username }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <a href="/help">Help</a>
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
