import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import CreateHousehold from './pages/home/create/create';
import Change from './pages/Change';


function App() {
  return (
    <div>
 <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/change" element={<Change/>}/>

       <Route path="/create" element={<CreateHousehold/>}/>
 </Routes>
 </div>
  );
}

export default App;
