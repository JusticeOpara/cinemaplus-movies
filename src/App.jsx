import React from "react"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ForgotPassword from "./components/ForgotPassword"
import HomePage from "./components/HomePage";
import BookMark from "./components/BookMark"
import ProtectedRoute from "./ProtectedRoute"
import { AuthProvider } from "./StoredDirectory/authContext"


export default function App() {


  return (

    <BrowserRouter>

      <div className="App">

        <AuthProvider>

          <Routes>

            <Route element={<ProtectedRoute />}>

              <Route path="/" element={<HomePage />} />

            </Route>

             <Route path="*" element={<Login />} /> 

            <Route path="/auth/signup" element={<SignUp />} />

            <Route path="/auth/forgot-password" element={<ForgotPassword />} />

            <Route path="/auth/book-mark" element={<BookMark />} />

          </Routes>


        </AuthProvider>

      </div>

    </BrowserRouter>
  )

}

