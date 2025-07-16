import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePopover = ({ name }) => {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);
  const navigate = useNavigate();

  const togglePopover = () => {
    setShowPopover((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        id="profile"
        onClick={togglePopover}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: 'white',
          fontWeight: 'bold',
          fontSize: 18,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {name ? name[0].toUpperCase() : 'U'}
      </button>

      {/* Popover */}
      {showPopover && (
        <div
          ref={popoverRef}
          className="absolute top-12 right-0 bg-white shadow-lg rounded-xl p-4 w-48 z-50"
          style={{ border: '1px solid #ccc' }}
        >
          <div className="mb-3">
            <div className="font-semibold text-lg">{name || 'User'}</div>
            
          </div>
          
        </div>
      )}
    </div>
  );
};

export default ProfilePopover;
