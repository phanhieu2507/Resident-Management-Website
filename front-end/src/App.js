import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import CreateHousehold from './pages/home/create/create';
import Feedback from './pages/feedback/feedback';
import FeedbackResponse from './components/home/FeedbackResponse';
import Navbar from './components/navbar';
import ResidentTable from './components/home/ResidentTable';
import CreateResident from './pages/home/create/createResident';
function App() {
  return (
    <div>
      <Navbar/>
 <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/createhousehold" element={<CreateHousehold/>}/>
       <Route path="/createresident" element={<CreateResident/>}/>
       <Route path="/feedback" element={<Feedback/>}/>
       <Route path="/feedback_responses" element={<FeedbackResponse/>}/>
       <Route path="/resident" element={<ResidentTable/>}/>
 </Routes>
 </div>
  );
}

export default App;
