import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./lib/firebase"; // Import the Firestore db
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import GroupChat from "./components/chat/GroupChat";
import { useGroupChatStore } from "./lib/groupChatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const {groupId, changeGroupChat, groupName} = useGroupChatStore();

  const [groupChats,  setGroupChats] = useState([]); // To store group chats

  // Fetch user and group chats on auth state change
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);

      if (user) {
        fetchUserGroups(user.uid); // Fetch the groups when the user logs in
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  // Function to fetch groups where the user is a member
  const fetchUserGroups = async (userId) => {
    try {
      const groupsRef = collection(db, "groups");
      const q = query(groupsRef, where("members", "array-contains", userId));

      const querySnapshot = await getDocs(q);
      const groups = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGroupChats(groups); // Store the fetched group chats
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;


  return (
    <div className="container">
      {currentUser ? (
        <>
        <List groupChats={groupChats} /> {/* Pass group chats to the List */}
        {chatId && !groupId && <Chat />} {/* Only show Chat when chatId is present and groupId is not */}
        {groupId && !chatId && <GroupChat groupId={groupId} groupName={groupName}/>} {/* Only show GroupChat when groupId is present and chatId is not */}
        {/* Optionally render Detail if needed */}
        {/* {chatId && <Detail />} */}
      </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
