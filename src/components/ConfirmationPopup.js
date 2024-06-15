import React from "react";
import "../App.css";

const ConfirmationPopup = ({ message, onConfirm, onCancel, isOpen }) => {
  return (
    <div>
      {isOpen && <div className="backdrop open" onClick={onCancel}></div>}
      <div className={`popup-container ${isOpen ? "open" : ""}`}>
        <div className="popup">
          <p className="popup-message">{message}</p>
          <div className="footerPopup">
            <button className="save-button" onClick={onConfirm}>
              Confirm
            </button>
            <button className="close-button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
