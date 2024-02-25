// components/ProfileDropdown.tsx
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { logout, changeAccount } from "../redux/slices/userSlice";

const ProfileDropdown: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handlChangeAccount = (data: any) => {
    console.log("handlChangeAccount pending...")
    dispatch(changeAccount(data));
  };
  return (
    <Popup 
      trigger={
      <button className="profile bg-black text-white p-2 rounded-full">Profile</button>
    }
      position="bottom right"
      closeOnDocumentClick
      arrow={false}
      
      contentStyle={{ padding: 0, border: "none", borderRadius: "0.25rem" }}
    >
      <div className="bg-white shadow-md rounded mt-2 py-2 w-48">
      <p
          onClick={handlChangeAccount}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
        >
          Change Account
        </p>
        <p
          onClick={handleLogout}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
        >
          Logout
        </p>
        {/* Add other links/options as needed */}
      </div>
    </Popup>
  );
};

export default ProfileDropdown;
