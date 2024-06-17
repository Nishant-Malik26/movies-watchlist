import React, { useEffect } from "react";
import "../App.css";
import { IoClose } from "react-icons/io5";

const Drawer = ({ children, isOpen, toggleDrawer }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div>
      {isOpen && <div className="backdrop open" onClick={toggleDrawer}></div>}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-toggle-button" onClick={toggleDrawer}>
          <IoClose size={30} />
        </div>
        <div className="drawer-content">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
