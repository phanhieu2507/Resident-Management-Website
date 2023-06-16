import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
function App() {
  return (
    <div>
 <Routes>
       <Route path="/" element={<Home/>}/>
 </Routes>
 </div>
  );
}

export default App;
