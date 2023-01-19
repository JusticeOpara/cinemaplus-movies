import React from "react"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForgotPassword from "./components/ForgotPassword"
import HomePage from "./components/HomePage";

export default function App() {

  return (

    <BrowserRouter>

      <div className="App">

        <Routes>

          <Route path="/" element={<Login />} exact />

          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          <Route path="/SignUp" element={<SignUp />} />
          
          <Route path="/HomePage" element={<HomePage/>}/>

          
        </Routes>


      </div>

    </BrowserRouter>


  )
}

