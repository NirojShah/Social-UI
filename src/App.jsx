import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Authentication/Login";
// import Prax from "./Component/Prax";
import Home from "./Component/Home/Home";
import Protectedroute from "./Service Route/Protextedroute";
import Nav from "./Component/Nav Bar/Nav";
import Myfriends from "./Component/Friends/Myfriends";
import Feeds from "./Component/Feeds/Feeds";
import Chat from "./Component/Chat/Chat";
import Friends from "./Component/Friends/Friends";
import Writefeed from "./Component/Feeds/writefeed";
import Delete from "./Component/Delete";
import Requests from "./Component/Friends/Requests/Requests";
import Profile from "./Component/Profile/Profile";
import Prax from "./Component/Prax";
import Updateprofile from "./Component/Profile/UpdateProfile/Updateprofile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/prax" element={<Prax />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protectedroute>
              <Home />
            </Protectedroute>
          }
        >
          <Route path="/home/chats" element={<Chat />} />
          <Route path="/home/friends" element={<Friends />} />
          <Route path="/home/feeds" element={<Feeds />} />
          <Route path="/home/feeds/write" element={<Writefeed />} />
          <Route path="/home/chat/:id" element={<Delete />} />
        </Route>
        <Route path="/myrequests" element={<Requests />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/edit" element={<Updateprofile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
