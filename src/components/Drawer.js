import React from "react";
import "../App.css";
import { IoClose } from "react-icons/io5";

const Drawer = ({ children, isOpen, toggleDrawer }) => {
  return (
    <div>
      {isOpen && <div className="backdrop open" onClick={toggleDrawer}></div>}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-toggle-button" onClick={toggleDrawer}>
          <IoClose size={30} />
        </div>
        <div className="drawer-content">
          {children}
          <div className="footer">
            <button className="close-button" onClick={toggleDrawer}>
              Close
            </button>
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
