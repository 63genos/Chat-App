import { useEffect, useRef, useState } from 'react';
import './chat.css'; 
import EmojiPicker from 'emoji-picker-react';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from '../../lib/firebase';
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload"; 
import "./groupChat.css";

const GroupChat = ({ groupId, groupName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [img, setImg] = useState({ file: null, url: '' });
  const [open, setOpen] = useState(false);
  const emojiPickerRef = useRef(null);
  const endRef = useRef(null);

  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!groupId) return;

    const messagesRef = collection(db, 'groups', groupId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => {
      unsubscribe();
    };
  }, [groupId]);

const sendMessage = async () => {
  if (newMessage.trim() === '' && !img.file) {
    console.log("Cannot send an empty message or image");
    return;
  }

  const messagesRef = collection(db, 'groups', groupId, 'messages');
  let imgUrl = null;

  try {
    
    if (img.file) {
      imgUrl = await upload(img.file); 
    }

   
    await addDoc(messagesRef, {
      text: newMessage || null, 
      senderId: currentUser.id,
      senderName: currentUser.username,
      createdAt: serverTimestamp(),
      ...(imgUrl && { img: imgUrl }), 
    });

    console.log("Message sent successfully");

    setNewMessage(''); 
    setImg({ file: null, url: '' }); 
  } catch (err) {
    console.error("Error sending message:", err);
  }
};


  
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
    }
  };

  
  const handleEmoji = (e) => {
    setNewMessage((prev) => prev + e.emoji);
  };

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="groupChat">
      <div className="groupName">{groupName}</div>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}>
            <span>{msg.senderId === currentUser.id ? 'You' : msg.senderName}</span>
            {msg.img && <img src={msg.img} alt="Sent Image" />}
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      <div className="inputBox">
        
        <label htmlFor="file">
          <img src="./img.png" alt="Upload" />
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleImg}
        />

        
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage(); 
          }}
        />

        
        <div className="emoji">
          <img src="./emoji.png" alt="Emoji Picker" onClick={() => setOpen((prev) => !prev)} />
          {open && (
            <div className="picker" ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>

        
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default GroupChat;
