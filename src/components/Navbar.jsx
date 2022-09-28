import { signOut } from "firebase/auth";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className='logo'>App Chat</span>
      <div className='user'>
        <img alt='profpict' src={currentUser.photoURL} />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
