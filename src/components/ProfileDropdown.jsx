import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "User");
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm text-white focus:outline-none"
      >
        <img
          className="h-8 w-8 rounded-full"
          src="src/assets/images/profile1.avif"
          alt="User profile"
        />
        <span>{userName}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              onClick={() => {
                setIsOpen(false);
                navigate("/manage-account");
              }}
            >
              Manage Account
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              onClick={() => {
                setIsOpen(false);
                navigate("/change-password");
              }}
            >
              Change Password
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              onClick={() => {
                setIsOpen(false);
                navigate("/activity-log");
              }}
            >
              Activity Log
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ProfileDropdown;
