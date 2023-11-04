import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from 'react';
import Alert from "./components/Alert";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Router>
        <Navbar/>
        <Alert alert={alert}/>
        <Routes>
        <Route exact path='/login' element={<Login showAlert={showAlert}/>}>
              </Route>
        <Route exact path='/' element={<Welcome showAlert={showAlert}/>}></Route>
        <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
        </Routes>
        
        </Router>
      </div>
      <Services/>
      <Footer/>
      
    </div>
  );
}

export default App;
