import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDjhaq_CIHB6i4ruCXHKabXRq2HsRxrW7k",
  authDomain: "auth-production-e31c4.firebaseapp.com",
  projectId: "auth-production-e31c4",
  storageBucket: "auth-production-e31c4.appspot.com",
  messagingSenderId: "846004746307",
  appId: "1:846004746307:web:86fc67751a67e6e01a3cf6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export const signIn = async (email, password) => {

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential, "--UserCredential")

    const user = userCredential.user;

    console.log(user, "--user")
    return true
  } catch (error) {
 
    if (windows.error.code === 'auth/wrong-password'||'auth/wrong-email') {
      console.log('Incorrect password. Please try again.');
    } else {
      console.log(error);
    }

  }
};


export const signup = async (email, password) => {
  console.log(email, "--pasword")

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    console.log(userCredential, "--Credential")

    const user = userCredential.user;

    console.log(user, "--USER")


    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
    });

    return true
  } catch (error) {

    console.log(error, "--ERRORCODE-SIGNUP")
    const errorCode = error.code;
    console.log(errorCode, "--errorCode")

    const errorMessage = error.message;
    console.log(errorMessage, "--errorMessage");
    
  
  }


}


