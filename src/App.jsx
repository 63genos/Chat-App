import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

const App = () => {

  const user = true;
  return (
    <div className='container'>
      {
        user ? (
          <>
            <List />
            <Chat />
          </>
        ) : (
          <Login />
        )
      }
      <Notification/>
    </div>
  );
}

export default App;
