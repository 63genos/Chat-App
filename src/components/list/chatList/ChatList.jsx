import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc, collection, query, where, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import { useGroupChatStore } from "../../../lib/groupChatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [groups, setGroups] = useState([]); // To store groups the user is part of
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const { groupId, changeGroupChat} = useGroupChatStore();

  // Fetch individual chats
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  // Fetch groups where the current user is a member
  useEffect(() => {
    const fetchGroups = async () => {
      const groupQuery = query(
        collection(db, "groups"),
        where("members", "array-contains", currentUser.id) // Only fetch groups where the user is a member
      );

      const groupSnap = await getDocs(groupQuery);

      const groupData = groupSnap.docs.map((doc) => ({
        ...doc.data(),
        groupId: doc.id,
      }));

      setGroups(groupData);
    };

    fetchGroups();
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGroupSelect = async (group) => {
    console.log("handleGroupSelect");
    // Check if a chat for this group already exists
    const groupChatRef = doc(collection(db, "chats"));
    const groupChatSnap = await getDoc(groupChatRef);
  
    if (!groupChatSnap.exists()) {
      // Create a new chat for the group if it doesn't exist
      await setDoc(groupChatRef, {
        createdAt: serverTimestamp(),
        members: Array.isArray(group.members) ? group.members : [], // Ensure it's an array
        messages: [],
      });
    }
  
    // Pass the group name along with groupId and members
    changeGroupChat(group.groupId, group.name, Array.isArray(group.members) ? group.members : []); // Pass array
  };
  


  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {/* Display individual chats */}
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? "./avatar.png"
                : chat.user.avatar || "./avatar.png"
            }
            alt=""
          />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {/* Display groups */}
      {filteredGroups.map((group) => (
        <div
          className="item"
          key={group.groupId}
          onClick={() => handleGroupSelect(group)}
          style={{
            backgroundColor: "#6A67CE", // Customize background for groups if needed
          }}
        >
          <img src="./avatar.png" alt="Group Avatar" />
          <div className="texts">
            <span>{group.name}</span>
            <p>Group Chat</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
