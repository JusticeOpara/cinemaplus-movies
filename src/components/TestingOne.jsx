import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const baseURL = "https://api.themoviedb.org/3/trending/all/day?api_key=548b87909aaf9fd5305170f710122e89"

export default function TestingOne() {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(baseURL).then((data) => {

      const { data: innerData } = data;

      const movieList = [...innerData?.results];
      console.log(movieList, "MOVELIST")
      setContent(movieList);

      setLoading(false)
    });

  }, [page])

}
// const [success, setSuccess] = useState(false);

// useEffect(() => {
//     if (success) {
//     navigate('/HomePage');
//     }
// }, [success]);
// if (signupContext.success) {
//     setSuccess(true)
// }
useEffect(() => {
  firebaseObserver.subscribe('authStateChanged', data => {
    console.log(data, "--authStateChanged")

    setIsAuthenticated(data);
    setIsLoading(false)

  });

  return () => { firebaseObserver.unsubscribe('authStateChanged'); }

}, []);




const bookmarkRef = doc(db, "users", `${userId}`)
console.log(bookmarkRef, "--(bookmarkRef)")

const colRef = collection(bookmarkRef, "bookmark")
await addDoc(colRef, {
  useId: userId,
  movies: movies,
});

// As a professional, may I inquire if you have considered the benefits of owning your own website? 
// By having a website, you can provide a seamless shopping experience for your customers, 
// making it easier for them to purchase from you. In addition, having an active website can facilitate referrals, 
// allowing satisfied customers to easily share your website with their friends and family.

// Furthermore, owning a website can save you time and energy, 
// as it can eliminate the need to engage in time-consuming interactions with customers who may be indecisive or demanding. 
// Instead, customers can browse your website and make their purchases independently, without requiring your constant attention or intervention.

//  By implementing a website, you can offer your customers the convenience of browsing 
// and purchasing your products or services at their own pace, 
// while simultaneously increasing your own efficiency and productivity. 
// Would you like to discuss further the benefits of owning a website for your business?






const db = firebase.firestore();
const myCollection = db.collection("myCollection");

const data = {
  name: "John Doe",
  age: 25,
  email: "johndoe@example.com"
};

myCollection
  .add(data)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
