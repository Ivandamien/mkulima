// import { useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoMdClose } from "react-icons/io";
// import { MdLogout } from "react-icons/md";
// const Header = () => {
//   const username = localStorage.getItem("username");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Handle sidebar toggle
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     localStorage.removeItem("accessToken");
//     window.location.href = "/"; // Redirect to login page
//   };

//   return (
//     <div className="header">
//       <h1>Inua Mkulima Subsidy Program</h1>
//       <div className="header-right">
//         <p className="header-username">
//           Logged in as:{" "}
//           <strong>
//             <span className="username">{username}</span>
//           </strong>
//         </p>
//         <button className="logout-button" onClick={handleLogout}>
//           <span>
//             <MdLogout size={24} />
//           </span>
//           Logout
//         </button>
//       </div>
//       {/* Hamburger Menu Button (Right side of the header) */}
//       <div className="hamburger-menu" onClick={toggleSidebar}>
//         {isSidebarOpen ? (
//           <IoMdClose size={30} color="white" />
//         ) : (
//           <GiHamburgerMenu size={30} color="white" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

// import { useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoMdClose } from "react-icons/io";
// import { MdLogout } from "react-icons/md";
// import "./Modal.css";
// // Import Modal component
// const Modal = ({ isOpen, onClose, onConfirm }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h2>Log Out?</h2>
//         <img
//           src="/assets/log out - icon.png"
//           alt="Logout"
//           className="modal-icon"
//         />
//         <p>Are you sure you want to log out?</p>
//         <div className="modal-buttons">
//           <button className="back-button" onClick={onClose}>
//             Back
//           </button>
//           <button className="confirm-button" onClick={onConfirm}>
//             Yes, log out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Header = () => {
//   const username = localStorage.getItem("username");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Handle sidebar toggle
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Handle logout functionality
//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     localStorage.removeItem("accessToken");
//     window.location.href = "/"; // Redirect to login page
//   };

//   return (
//     <div className="header">
//       <h1>Inua Mkulima Subsidy Program</h1>
//       <div className="header-right">
//         <p className="header-username">
//           Logged in as:{" "}
//           <strong>
//             <span className="username">{username}</span>
//           </strong>
//         </p>
//         <button
//           className="logout-button"
//           onClick={() => setIsModalOpen(true)} // Open the modal
//         >
//           <span>
//             <MdLogout size={24} />
//           </span>
//           Logout
//         </button>
//       </div>

//       {/* Hamburger Menu Button */}
//       <div className="hamburger-menu" onClick={toggleSidebar}>
//         {isSidebarOpen ? (
//           <IoMdClose size={30} color="white" />
//         ) : (
//           <GiHamburgerMenu size={30} color="white" />
//         )}
//       </div>

//       {/* Logout Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)} // Close the modal
//         onConfirm={() => {
//           handleLogout(); // Perform logout
//           setIsModalOpen(false); // Close the modal
//         }}
//       />
//     </div>
//   );
// };

// export default Header;
// import { useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoMdClose } from "react-icons/io";
// import { MdLogout } from "react-icons/md";
// import Modal from "./Modal"; // Modal component
// // import "./Header.css"; // Ensure styles for header

// const Header = ({ toggleSidebar, isSidebarOpen }) => {
//   const username = localStorage.getItem("username");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Handle logout functionality
//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     localStorage.removeItem("accessToken");
//     window.location.href = "/"; // Redirect to login page
//   };

//   return (
//     <div className="header">
//       <h1>Inua Mkulima Subsidy Program</h1>
//       <div className="header-right">
//         <p className="header-username">
//           Logged in as:{" "}
//           <strong>
//             <span className="username">{username}</span>
//           </strong>
//         </p>
//         <button
//           className="logout-button"
//           onClick={() => setIsModalOpen(true)} // Open the modal
//         >
//           <span>
//             <MdLogout size={24} />
//           </span>
//           Logout
//         </button>
//       </div>

//       {/* Hamburger Menu Button */}
//       <div className="hamburger-menu" onClick={toggleSidebar}>
//         {isSidebarOpen ? (
//           <IoMdClose size={30} color="white" />
//         ) : (
//           <GiHamburgerMenu size={30} color="white" />
//         )}
//       </div>

//       {/* Logout Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)} // Close the modal
//         onConfirm={() => {
//           handleLogout(); // Perform logout
//           setIsModalOpen(false); // Close the modal
//         }}
//       />
//     </div>
//   );
// };

// export default Header;

// import { useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoMdClose } from "react-icons/io";
// import { MdLogout } from "react-icons/md";
// import Sidebar from "./Sidebar"; // Import Sidebar component
// import Modal from "./Modal"; // Import Modal component

// const Header = () => {
//   const username = localStorage.getItem("username");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Handle sidebar toggle
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Handle logout functionality
//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     localStorage.removeItem("accessToken");
//     window.location.href = "/"; // Redirect to login page
//   };

//   return (
//     <>
//       {/* Sidebar Component */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Header Component */}
//       <div className="header">
//         <h1>Inua Mkulima Subsidy Program</h1>
//         <div className="header-right">
//           <p className="header-username">
//             Logged in as:{" "}
//             <strong>
//               <span className="username">{username}</span>
//             </strong>
//           </p>
//           <button
//             className="logout-button"
//             onClick={() => setIsModalOpen(true)} // Open the logout confirmation modal
//           >
//             <span>
//               <MdLogout size={24} />
//             </span>
//             Logout
//           </button>
//         </div>

//         {/* Hamburger Menu Button (Visible on small screens) */}
//         <div className="hamburger-menu" onClick={toggleSidebar}>
//           {isSidebarOpen ? (
//             <IoMdClose size={30} color="white" />
//           ) : (
//             <GiHamburgerMenu size={30} color="white" />
//           )}
//         </div>
//       </div>

//       {/* Logout Confirmation Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)} // Close the modal
//         onConfirm={() => {
//           handleLogout(); // Perform logout
//           setIsModalOpen(false); // Close the modal
//         }}
//       />
//     </>
//   );
// };

// export default Header;
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import Sidebar from "./Sidebar"; // Import Sidebar component
import Modal from "./Modal"; // Import Modal component
// import "./Header.css"; // Ensure styles for header

const Header = () => {
  const username = localStorage.getItem("username");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <>
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        username={username}
      />

      {/* Header Component */}
      <div className="header">
        <h1>Inua Mkulima Subsidy Program</h1>
        <div className="header-right">
          <p className="header-username">
            Logged in as:{" "}
            <strong>
              <span className="username">{username}</span>
            </strong>
          </p>
          <button
            className="logout-button"
            onClick={() => setIsModalOpen(true)} // Open the logout confirmation modal
          >
            <span>
              <MdLogout size={24} />
            </span>
            Logout
          </button>
        </div>

        {/* Hamburger Menu Button (Visible on small screens) */}
        <div className="hamburger-menu" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <IoMdClose size={30} color="white" />
          ) : (
            <GiHamburgerMenu size={30} color="white" />
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onConfirm={() => {
          handleLogout(); // Perform logout
          setIsModalOpen(false); // Close the modal
        }}
      />
    </>
  );
};

export default Header;
