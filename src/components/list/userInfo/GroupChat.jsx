import React, { useState } from 'react';
import "./groupChat.css"
import { db } from '../../../lib/firebase';
import { getDoc, doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore";

function GroupChatButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [friendsList, setFriendsList] = useState([]);  // To store the list of friends
  const [selectedFriends, setSelectedFriends] = useState([]);  // Selected friends for the group

  const { currentUser } = useUserStore();

  // Fetch only friends from the current user's chat list
  const fetchFriends = async () => {
    try {
      const userChatsRef = doc(db, "userchats", currentUser.id);
      const userChatsSnap = await getDoc(userChatsRef);

      if (userChatsSnap.exists()) {
        const userChatsData = userChatsSnap.data().chats || [];

        // Fetch details for each friend in the chats
        const friendsPromises = userChatsData.map(async (chat) => {
          const friendSnap = await getDoc(doc(db, "users", chat.receiverId));
          return friendSnap.data();
        });

        const friends = await Promise.all(friendsPromises);
        setFriendsList(friends); // Set the friends list
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle the opening and closing of the modal
  const handleOpenModal = () => {
    fetchFriends(); // Fetch friends each time modal is opened
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setGroupName('');
    setSelectedFriends([]);
  };

  // Handle selecting friends for the group
  const handleFriendSelect = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  // Create the group and add to Firebase
  const handleCreateGroup = async () => {
    if (groupName && selectedFriends.length > 0) {
      const groupRef = doc(collection(db, 'groups'));
      await setDoc(groupRef, {
        name: groupName,
        members: [...selectedFriends, currentUser.id], // Include the current user
        createdAt: serverTimestamp(),
        createdBy: currentUser.id,
      });
      handleCloseModal();
    } else {
      alert('Please enter a group name and select at least one friend.');
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={handleOpenModal} className='createGroupButton'>Create Group</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Group</h2>

            {/* Group Name Input */}
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            {/* Checklist of Friends */}
            <div>
              <h4>Select Friends:</h4>
              <ul>
                {friendsList.map((friend) => (
                  <li key={friend.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedFriends.includes(friend.id)}
                        onChange={() => handleFriendSelect(friend.id)}
                      />
                      {friend.username}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Create Group Button */}
            <button onClick={handleCreateGroup}>Create Group</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupChatButton;
