import './App.css';
import React, { useState } from 'react';
import Login from './components/Log';
import Home from './components/home';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';



function App() {


  const [divClasses, setDivClasses] = useState('container');

  const handleSignin = ()=>{
    setDivClasses("container")
}

const handleSignup = ()=>{
  setDivClasses(divClasses + ' right-panel-active');
}

// const handleSignup = ()=>{
//   const container = document.getElementById("container");
  
//   container.classList.remove("right-panel-active");
//   console.log("dkkkkkk",container.classList)
// }

  return (
  
    <Router>

    {/* <Login divClasses={divClasses} handleSignup={handleSignup} handleSignin={handleSignin} /> */}
     <Routes>
  <Route exact path="/" element={<Home/>} />
  <Route path="/auth" element={ <Login divClasses={divClasses} handleSignup={handleSignup} handleSignin={handleSignin} />} />

    
   </Routes>
 
  </Router>
  
  
  );
}




export default App;
