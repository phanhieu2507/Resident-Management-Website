import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import CreateHousehold from './pages/home/create/create';
import Feedback from './pages/feedback/feedback';
import CreateFeedback from './pages/feedback/create/create';
function App() {
  return (
    <div>
 <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/create" element={<CreateHousehold/>}/>
       <Route path="/feedback" element={<Feedback/>}/>
       <Route path="create_feedback" element={<CreateFeedback/>}/>
 </Routes>
 </div>
  );
}

export default App;
