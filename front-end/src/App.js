import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import CreateHousehold from './pages/home/create/create';
import PopulationTable from './components/home/PopulationTable';
import Navbar from './components/navbar';
import HouseholdTable from './components/home/HouseholdTable';
function App() {
  return (
    <div>
      <Navbar/>
 <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/create" element={<CreateHousehold/>}/>


       <Route path='/household' element={<HouseholdTable/>}/>
       <Route path='/population' element={<PopulationTable/>}/>
 </Routes>
 </div>
  );
}

export default App;
