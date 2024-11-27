import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger icon for opening
import { IoMdClose } from "react-icons/io"; // Close icon for closing
import "./Dashboard.css";
import "./Sidebar.css"; // Sidebar specific styles

// Import your pages (components)
import Transactions from "./Transactions";
import Reports from "./Report";
import Header from "../components/Header";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Add a basic logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the stored token
    window.location.href = "/"; // Redirect to the login page
  };

  // Get username from localStorage (or you can pass it through state)
  const username = localStorage.getItem("username") || "Guest";

  return (
    <div className="dashboard-container">
      {/* Header with Background Image */}
      <Header />

      <div className="main-content">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/reports" onClick={() => setIsSidebarOpen(false)}>
                  Reports
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content (where nested routes are displayed) */}
        <main className="content">
          <Routes>
            <Route index element={<h2>Welcome to the Dashboard</h2>} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
