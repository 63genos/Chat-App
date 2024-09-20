import React from "react";
import { auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import "./logout.css"

const Logout = () => {
  const { resetChat } = useChatStore();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      resetChat();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className="logout" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
