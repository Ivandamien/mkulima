import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar"; // Ensure Sidebar is imported
import "./Dashboard.css";
import "./Sidebar.css"; // Sidebar specific styles

// Import your pages (components)
import Transactions from "./Transactions";
import Reports from "./Report";
import DashboardDetail from "../components/DashboardDetail";

const Dashboard = () => {
  const username = localStorage.getItem("username");

  // Set state for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Header with sidebar toggle */}
      <Header
        username={username}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility
        username={username}
      />

      <div
        className={`dashboard-content ${isSidebarOpen ? "sidebar-open" : ""}`}
      >
        {/* Define routes and render content dynamically */}
        <Routes>
          {/* Default Dashboard route */}
          <Route index element={<DashboardDetail />} />{" "}
          {/* Render dashboard content by default */}
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
