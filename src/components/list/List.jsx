import ChatList from "./chatList/ChatList"
import "./list.css"
import GroupChatButton from "./userInfo/GroupChat"
import Userinfo from "./userInfo/UserInfo"

const List = () => {
  return (
    <div className='list'>
      <Userinfo/>
      <ChatList/>
    </div>
  )
}

export default List