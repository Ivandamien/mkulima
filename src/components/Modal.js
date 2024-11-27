import React from "react";
import "./Modal.css"; // Add styles for the modal

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Log Out?</h2>
        <img
          src="/assets/log out - icon.png"
          alt="Logout Icon"
          className="modal-icon"
        />
        <p>Are you sure you want to log out?</p>
        <div className="modal-buttons">
          <button className="back-button" onClick={onClose}>
            Back
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
