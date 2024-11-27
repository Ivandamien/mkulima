import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import "./Dashboard.css";
import "./Sidebar.css"; // Sidebar specific styles

// Import your pages (components)
import Transactions from "./Transactions";
import Reports from "./Report";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

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

        {/* Main Content */}
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
