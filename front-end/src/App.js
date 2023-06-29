import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import CreateHousehold from './pages/home/create/create';
import Feedback from './pages/feedback/feedback';
function App() {
  return (
    <div>
 <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/create" element={<CreateHousehold/>}/>
       <Route path="/feedback" element={<Feedback/>}/>
 </Routes>
 </div>
  );
}

export default App;
