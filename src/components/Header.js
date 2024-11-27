import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdLogout } from "react-icons/md";
const Header = () => {
  const username = localStorage.getItem("username");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="header">
      <h1>Inua Mkulima Subsidy Program</h1>
      <div className="header-right">
        <p className="header-username">
          Logged in as:{" "}
          <strong>
            <span className="username">{username}</span>
          </strong>
        </p>
        <button className="logout-button" onClick={handleLogout}>
          <span>
            <MdLogout size={24} />
          </span>
          Logout
        </button>
      </div>
      {/* Hamburger Menu Button (Right side of the header) */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <IoMdClose size={30} color="white" />
        ) : (
          <GiHamburgerMenu size={30} color="white" />
        )}
      </div>
    </div>
  );
};

export default Header;
