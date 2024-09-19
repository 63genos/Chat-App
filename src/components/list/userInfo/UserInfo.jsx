import "./userInfo.css"

const UserInfo = () =>{
    return(
        <div className = 'userInfo'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h3>Parth Bedarkar</h3>
            </div>
            <div className="icons">
                <p><b>Logout</b></p>
            </div>
        </div>
    )
}
export default UserInfo
