import "./userInfo.css"
import { useUserStore } from "../../../lib/userStore";
import Logout from "../../detail/Logout";
const Userinfo = () => {

  const { currentUser } = useUserStore();

  return (
    <div className='userInfo'>
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      <Logout />
    </div>
  )
}

export default Userinfo