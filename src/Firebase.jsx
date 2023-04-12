import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import ReactObserver from 'react-event-observer';
import { getFirestore, addDoc,where, collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { signInWithEmailAndPassword } from "firebase/auth"
// import { sendPasswordResetEmail } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Await } from "react-router-dom";



const firebaseConfig = {
  apiKey: "AIzaSyDjhaq_CIHB6i4ruCXHKabXRq2HsRxrW7k",
  authDomain: "auth-production-e31c4.firebaseapp.com",
  projectId: "auth-production-e31c4",
  storageBucket: "auth-production-e31c4.appspot.com",
  messagingSenderId: "846004746307",
  appId: "1:846004746307:web:86fc67751a67e6e01a3cf6"
};

//  const storage = getStorage(app, "gs://my-custom-bucket")
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


export const firebaseObserver = ReactObserver();

onAuthStateChanged(auth, (user) => {

  firebaseObserver.publish("authStateChanged", loggedIn())

});

export function loggedIn() {
  return !!auth.currentUser;
}
console.log(loggedIn, "--loggedin")

export const signIn = async (email, password, username) => {

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
      username
    );
    // console.log(userCredential, "--UserCredential")

    const user = userCredential.user;
    // console.log(user, "--user")

    return true
  } catch (error) {

    if (window.error.code === 'auth/wrong-password' || 'auth/wrong-email') {

      console.log('Incorrect password. Please try again.');

    } else {
      console.log(error);
    }

  }
};


export const signup = async (email, password, username) => {
  // console.log(email, "--pasword")
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,

    );

    // console.log(userCredential, "--Credential")

    const user = userCredential.user;

    // console.log(user, "--USER")

    try {
      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        username: username
      });


    } catch (e) {

      console.error("Error adding document: ", e);
    }

  } catch (error) {
    console.log(error, "--ERRORCODE-SIGNUP")
    const errorCode = error.code;
    console.log(errorCode, "--errorCode")

    const errorMessage = error.message;
    console.log(errorMessage, "--errorMessage");
  }

}

export const forgotPassword = async (auth, email) => {
  try {
    const userCredential = await sendPasswordResetEmail(
      auth,
      email
    );
    // console.log(userCredential, "--UserCredential")

  } catch (error) {
    const errorCode = error.code;
    console.log(errorCode)
    const errorMessage = error.message;
    console.log(errorMessage)
  }
}


export const bookmark = async (userId, movies) => {

  try {

    const bookmarkRef = doc(collection(db, 'users', userId, 'bookmark'));
    console.log(bookmarkRef.id, "--BOOK--MARK--REF--");

    const moviesObj = { ...movies, userId: userId, bookmarkId: bookmarkRef.id }
    console.log(moviesObj, "---MOVIESOBJ")
    await setDoc(bookmarkRef, JSON.parse(JSON.stringify(moviesObj)),{merge: true});

  } catch (e) {
    console.log("Error in adding document from bookmark: ", e);
  }
};



export const getCollection = async (userId) => {

  try {

    const ordersRef = collection(db, "users", userId, "bookmark");
    // console.log(userId, "##$$$$$$$$$$$$$$$$$$$")

    const querySnapshot = await getDocs(ordersRef)
    // console.log(querySnapshot, "---QUERYSNAPSHOT")


    const res = []

    querySnapshot.forEach((dox) => {
      res.push({
        id: dox.id,
        ...dox.data()

      })
    })

    return res

  } catch (err) {

    console.log("Error in getting document from bookmark:", err)
  }

}

export const deleteRef = async (userId, bookmarkUid) => {

  try {
    const docRef = doc(db, "users", userId, "bookmark", bookmarkUid)
    console.log(bookmarkUid, "------justice boookmark id")
    await deleteDoc(docRef)

  } catch (err) {

    console.log("Error in getting document:", err)
  }

}










