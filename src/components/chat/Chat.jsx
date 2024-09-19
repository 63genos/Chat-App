import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useState, useEffect, useRef } from 'react';

const Chat = () => {
    const [open, setOpen] = useState(false); // State for controlling the emoji picker visibility
    const [text, setText] = useState(""); // State for the input text
    const emojiRef = useRef(null); // Reference to emoji picker for outside click detection

    // Handler for selecting an emoji and adding it to the text input
    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji); // Appending emoji to the text
    };

    // useEffect for closing the emoji picker when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setOpen(false); // Close the emoji picker
            }
        };

        // Adding the event listener for detecting clicks outside
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [emojiRef]);

    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({behaviour:"smooth"})
    }

    )
    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Ram Das</span>
                        <p>Sapney dekhna achi baat hai</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="" />
                        <p>
                            Lekin sapno k piche batai rehna aur sakno ko lekar sote rehna achi baat nhi hai
                        </p>
                        <span>
                            1 min ago
                        </span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="emoji" ref={emojiRef}>
                    <img
                        src="./emoji.png"
                        alt=""
                        onClick={() => setOpen((prev) => !prev)} // Toggle emoji picker visibility
                    />
                    <div className="picker">
                        {open && <EmojiPicker onEmojiClick={handleEmoji} />} {/* Show emoji picker if open */}
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
};

export default Chat;
