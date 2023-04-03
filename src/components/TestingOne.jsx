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

const cachedBookmarks = [...readData];

            const newState = cachedBookmarks.filter(data => data.bookmarkId !== bookmarkUid);

            setReadData(newState);
            
export const deleteCollection = async (userId) => {

  try {
    const docRef = doc(db, "users", user.uid);
     console.log(docRef.id,"---wwwwwwwwwwwwwwwwwwwww")


    const queryRef = query(collection(db, "users", userId, "bookmark"));
    const docSnapshot = await getDocs(queryRef);

    const deleteOps = [];
    docSnapshot.forEach((doc) => {
      deleteOps.push(deleteDoc(doc.id));
    });

    console.log(deleteOps, "---deleteOps")
    return deleteOps

  } catch (err) {
    console.log("Error in getting document:", err)
  }
}

// How to avoid adding a data repeatedly in firebase?-show in async function javascript
async function addDataIfNotExists(database, collectionName, data) {
  // Check if data already exists in the collection
  const snapshot = await database.collection(collectionName).where("fieldName", "==", data.fieldName).get();
  if (!snapshot.empty) {
    console.log("Data already exists.");
    return;
  }

  // Add data to the collection if it doesn't exist
  await database.collection(collectionName).add(data);
  console.log("Data added successfully.");
}
// In this example, the addDataIfNotExists function takes in the Firebase database instance, 
// the name of the collection to add data to, and the data object to be added. 
// The function first queries the collection to check if a document with the same fieldName already exists. 
// If it does, the function simply returns without adding the data. If the query doesn't return any results, 
// the function adds the data to the collection using the add method and logs a success message.

// You can call this function with your own database instance, collection name, and data object. 


const docId = "unique_document_id";
const subcollectionRef = firestore
  .collection("parent_collection")
  .doc("parent_doc_id")
  .collection("subcollection");

async function addDocToSubcollection() {
  try {
    const doc = await subcollectionRef.doc(docId).get();
    if (doc.exists) {
      console.log("Document already exists in the subcollection");
    } else {
      await subcollectionRef.doc(docId).set({
        // document data here
      });
      console.log("Document added to the subcollection");
    }
  } catch (error) {
    console.error("Error adding document to subcollection: ", error);
  }
}

addDocToSubcollection();


export const bookmark = async (userId, movies) => {

  try {

    const bookmarkRef = doc(collection(db, 'users', userId, 'bookmark'));
    const docId = bookmarkRef.id
    const doc = await bookmarkRef.doc(docId);
     if(doc.exists){
      console.log("document already exists in the subcollection")
     }else{
      const moviesObj = { ...movies, userId: userId, bookmarkId: docId }
       console.log(moviesObj, "---MOVIESOBJ")
       await setDoc(bookmarkRef, JSON.parse(JSON.stringify(moviesObj)), { merge: true });
     }
    // const moviesObj = { ...movies, userId: userId, bookmarkId: docId }
    // console.log(moviesObj, "---MOVIESOBJ")
    // await setDoc(bookmarkRef, JSON.parse(JSON.stringify(moviesObj)), { merge: true });

  } catch (e) {
    console.log("Error in adding document from bookmark: ", e);
  }
};