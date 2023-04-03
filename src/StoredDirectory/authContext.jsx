import React from "react"
import { createContext } from "react"
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { loggedIn, firebaseObserver } from "../Firebase";
import { useNavigate } from "react-router-dom";

export const API_ENDPOINT = "https://api.themoviedb.org/3/trending/all/day?api_key=548b87909aaf9fd5305170f710122e89"
const AuthContext = createContext()

AuthContext.displayName = "AuthContext"



const AuthProvider = ({ children }) => {
    const auth = getAuth();


    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    // const [isAuthenticated, setIsAuthenticated] = useState(loggedIn());
    // console.log(isAuthenticated, "---isAuthentciated --isAuthenciated")
    
    // const navigate = useNavigate()


    useEffect(() => {
        setIsLoading(false);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // user is signed in
                // const user = user.displayName;

                setUser(user)
                console.log(user, "--USERID###############")

                //   navigate('/');
            } else {
                // User is signed out
                setUser(null) 
            }
        });

        //  setIsLoading(true);
        console.log(unsubscribe, "--unsubscribe")

        return () => {
            unsubscribe();
        };
    }, []);




    const value = { user }
    // console.log(value, "--VALUEIS AUTHENTICATION")

    // console.log(children, "--childern")
    return (
        !isLoading &&
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

    )

}

const useAuth = () => {
    const context = React.useContext(AuthContext)

    console.log(context, "--CONtextconntext")

    if (context === undefined) {
        throw new Error("useAuth is not in the context")

    }
    return context

}



export { AuthProvider, useAuth }