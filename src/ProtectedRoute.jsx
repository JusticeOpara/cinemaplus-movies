import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "./StoredDirectory/authContext"


export default function ProtectedRoute() {
  const { user } = useAuth()
  console.log("Check user in Private: ", user);

  return (

    user ? <Outlet /> :  <Navigate to="*" />


  )


}

