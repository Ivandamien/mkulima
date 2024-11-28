// import React from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import "./PaymentModal.css"; // Create a separate CSS file for styling the modal

// const PaymentModal = ({
//   isVisible,
//   totalDeduction,
//   onDownload,
//   onDone,
//   customerName,
//   customerId,
// }) => {
//   if (!isVisible) return null; // If modal is not visible, return nothing

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Payment Successful</h2>
//         <div className="modal-icon">
//           <FaCheckCircle size={40} color="green" />
//         </div>
//         <p>Ref: wdfgyhjj</p>
//         <p>Date: {new Date().toLocaleString()}</p>
//         <p>Total Deduction: ${totalDeduction.toFixed(2)}</p>
//         <p className="modal-paragraph">
//           Agrovet product purchase for {customerName} - {customerId}
//         </p>
//         <div className="modal-buttons">
//           <button className="btn-download" onClick={onDownload}>
//             Download Receipt
//           </button>
//           <button className="btn-done" onClick={onDone}>
//             Done
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./PaymentModal.css";

const PaymentModal = ({
  isVisible,
  totalDeduction,
  onDownload,
  onDone,
  customerName,
  customerId,
}) => {
  if (!isVisible) return null;

  const formatDateWithOrdinal = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";

    return `${day}${suffix} ${month} ${year}`;
  };
  const currentDate = new Date();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Payment Successful</h2>
        </div>
        <div className="modal-body">
          <p className="modal-reference">
            Ref Number:: <strong> Abakfah3913af</strong>{" "}
          </p>
          <p className="modal-date">
            Date: <strong>{formatDateWithOrdinal(currentDate)}</strong>
          </p>
          <FaCheckCircle className="modal-icon" size={50} />
          <p className="modal-amount">
            <strong> ${totalDeduction.toFixed(2)}</strong>
          </p>
          <p className="modal-description">
            Agrovet product purchase for <br />
            <strong>
              {" "}
              {customerName} - {customerId}
            </strong>
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-download" onClick={onDownload}>
            Download Receipt
          </button>
          <button className="btn-done" onClick={onDone}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
