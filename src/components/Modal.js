import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Log Out?</h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/159/159707.png" // Placeholder logout icon
          alt="Logout"
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
