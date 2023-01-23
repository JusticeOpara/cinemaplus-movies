import React from "react"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ForgotPassword from "./components/ForgotPassword"
import HomePage from "./components/HomePage";
import { loggedIn, firebaseObserver } from "./Firebase";
import { useEffect, useState } from "react";

export default function App() {
  const [authenticated, setAuthenticated] = useState(loggedIn());
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    firebaseObserver.subscribe('authStateChanged', data => {
      console.log(data, "--Data")
      // if (data){
      //   <Navigate to={<HomePage/>}/>
      // }
      setAuthenticated(data);

      setIsLoading(false);

    });
    
    return () => { firebaseObserver.unsubscribe('authStateChanged'); }

  }, []);
  
  return isLoading ? <p>loading...</p> :
    <BrowserRouter>

      <div className="App">

        <Routes>

           <Route path="/" element={<Navigate to={authenticated ? "/HomePage" : "/Login"} replace />}/> 

          <Route path="/Homepage" element={<HomePage />} hasAccess={authenticated} />

          <Route path="/Login" element={<Login />} hasAccess={!authenticated} exact />




          <Route path="/SignUp" element={<SignUp />} />

          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          <Route path="*" element={<Navigate to={authenticated ? "/HomePage" : "/Login"} replace />} />


        </Routes>


      </div>

    </BrowserRouter>



}

