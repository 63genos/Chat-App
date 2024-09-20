import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./lib/firebase"; 
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import GroupChat from "./components/chat/GroupChat";
import { useGroupChatStore } from "./lib/groupChatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const {groupId, changeGroupChat, groupName} = useGroupChatStore();

  const [groupChats,  setGroupChats] = useState([]); 

  
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);

      if (user) {
        fetchUserGroups(user.uid); 
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  
  const fetchUserGroups = async (userId) => {
    try {
      const groupsRef = collection(db, "groups");
      const q = query(groupsRef, where("members", "array-contains", userId));

      const querySnapshot = await getDocs(q);
      const groups = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGroupChats(groups); 
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;


  return (
    <div className="container">
      {currentUser ? (
        <>
        <List groupChats={groupChats} /> 
        {chatId && !groupId && <Chat />} 
        {groupId && !chatId && <GroupChat groupId={groupId} groupName={groupName}/>} 
      </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
