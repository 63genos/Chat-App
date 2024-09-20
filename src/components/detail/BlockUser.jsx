import React from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const BlockUser = ({ user, currentUser, isReceiverBlocked, changeBlock }) => {
  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={handleBlock}>
      {isReceiverBlocked ? "User blocked" : "Block User"}
    </button>
  );
};

export default BlockUser;
