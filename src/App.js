
import './App.css';
import React, {useState} from "react";
import Navbar from './components/Navbar';
import About from './components/About';
import { Home } from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [alert, newAlert] = useState(null)
function showAlert(type, message) {
  newAlert({
    type:type,
    msg:message
  });
  setTimeout(() => {
    newAlert(null);
  }, 3000);
}
  return (
    <>
      <NoteState>
      <Router> 
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
      <Routes>
        <Route path="/about" element={<About />} />
        <Route  path="/" element={<Home showAlert={showAlert}/>} />
        <Route  path="/login" element={<Login showAlert={showAlert}/>} />
        <Route  path="/signup" element={<Signup showAlert={showAlert}/>} />
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
