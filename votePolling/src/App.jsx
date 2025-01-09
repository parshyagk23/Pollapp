import React from 'react'
import './App.css'
import Home from './Components/Home/Home'
import { Route, Routes } from "react-router-dom";
import CreatePoll from './Components/CreatePoll/CreatePoll';
import PollList from './Components/PollList/PollList';
import PollDtails from './Components/PollDetails/PollDtails';
import { ConfirmVote } from './Components/ConfirmVote';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Navbar from './Components/Navbar/Navbar';
import ProtectRoute from './ProtectRoute';

function App() {

  
  return (
    < >
      <Navbar/>
     <Routes>
     <Route path="/" element={<ProtectRoute Component={Home} />} />
     <Route path="/poll" element={<ProtectRoute Component={CreatePoll} />} />
     <Route path="/list" element={<ProtectRoute Component={PollList} />} />
     <Route path="/poll/:id" element={<ProtectRoute Component={PollDtails} />} />
     <Route path="/confirm" element={<ProtectRoute Component={ConfirmVote} />} />
     <Route path='/login' element= {< Login/>}/>
     <Route path='/register' element= {<Register/>}/>
     
     </Routes>
    
    </>
  )
}

export default App
