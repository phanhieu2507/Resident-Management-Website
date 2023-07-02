import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import CreateHousehold from './pages/home/create/create';
import Feedback from './pages/feedback/feedback';
import Navbar from './components/navbar';
import Resident from './pages/resident/resident';
import CreateResident from './pages/resident/create/create';
import CreateFeedback from './pages/feedback/create/create';
import Change from './pages/change/change';
import NotFound from './pages/404/404';
import Login from './pages/login/login';
import FeedbackResponse from './pages/feedback_response/feedback_response';

function App() {
  return (
    <div>
 <Routes>
 <Route path="*" element={<NotFound />} />

        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>
       <Route path="/home" element={<Home/>}/>
       <Route path="/createhousehold" element={<CreateHousehold/>}/>
       <Route path="/residents/create" element={<CreateResident/>}/>
       <Route path="/feedback" element={<Feedback/>}/>
       <Route path="/residents" element={<Resident/>}/>
       <Route path="create_feedback" element={<CreateFeedback/>}/>
       <Route path="/changes" element= {<Change/>}/>
       <Route path="/feedback_responses" element= {<FeedbackResponse/>}/>
 </Routes>
 </div>
  );
}

export default App;
