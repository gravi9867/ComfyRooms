import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Register from "./screens/Register";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/admin" exact element={<Adminscreen />}></Route>
          <Route path="/home" exact element={<Homescreen />}></Route>
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            element={<Bookingscreen />}
          ></Route>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/login" exact element={<Loginscreen />}></Route>
          <Route path="/" exact element={<Landingscreen />}></Route>
          <Route path="/profile" exact element={<Profilescreen />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
