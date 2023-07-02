import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import CreateHousehold from './pages/home/create/create';
import Feedback from './pages/feedback/feedback';
import FeedbackResponse from './pages/feedback_response'
import Navbar from './components/navbar';
import ResidentTable from './components/resident/ResidentTable';
import CreateResident from './pages/home/create/createResident';
import CreateFeedback from './pages/feedback/create/create';
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
       <Route path="create_feedback" element={<CreateFeedback/>}/>
 </Routes>
 </div>
  );
}

export default App;
