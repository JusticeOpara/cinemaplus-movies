import React from "react"
import './styles.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteRef, getCollection } from "../Firebase"
import { useAuth } from "../StoredDirectory/authContext";
import { connectStorageEmulator } from "firebase/storage"





export default function BookMark() {

    const { user } = useAuth()
    console.log(user, "----bookmarkAuthContext")

    const [isLoading, setIsLoading] = useState(false)
    const [readData, setReadData] = useState([])
    const img_300 = "https://image.tmdb.org/t/p/w300"
    const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";


    const handleDelete = async (bookmarkUid) => {
        try {

            await deleteRef(user.uid, bookmarkUid);
            const orginalArrayBookmarks = [...readData];

            const newArray = orginalArrayBookmarks.filter(data => data.bookmarkId !== bookmarkUid);

            setReadData(newArray);

            // console.log(deleteData, "DELETE-REF#")

        } catch (error) {

            console.log(error, "-TOASTERROR")
        }

    }

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const res = await getCollection(user.uid)
            console.log(res, "--getCollection")

            setReadData([...res])

        } catch (error) {
            console.log(error)

        } finally {
            setIsLoading(false)
        }

    };


    useEffect(() => {
        fetchData()
    }, [])

    console.log(readData, "--readData")

    return (
        <>
            {isLoading ? <p>LOADING...</p> :

                <div className="bookmark-container">

                    <div className="bm-header">

                        <div className="bm-navbar">

                            <div className="bm-logo">
                                {/* <span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 72 72">
                                    <path fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"
                                        d="M19.582 55.606c.484.178 1.03.297 1.575.297c.849 0 1.697-.297 2.425-.772l30-15.98l.303-.296c.788-.772 1.212-1.723 
                                           1.212-2.792c0-1.07-.425-2.08-1.212-2.792l-.303-.297l-30-16.098c-1.091-.832-2.667-1.01-4-.475c-1.516.594-2.485 
                                            2.079-2.485 3.683v31.84c0 1.603.97 3.088 2.485 3.682z"/>
                                </svg>
                                <p className="x">WatchList</p>
                                {/* </span> */}

                            </div>

                            <p className="x">
                                <Link to="/" style={{ color: "#00ADB5" }}> Homepage </Link>
                            </p>

                            

                            <div className='login-btn'>
                                <Link to="/Login" style={{ color: "#fff" }}>
                                    Sign out
                                </Link>
                            </div>

                        </div>

                        <div className="bm-headerContent">
                            {/* <div > */}
                                <h2 className="hero-title"> MY BOOKMARKED COLLECTION</h2>

                                <p className="hero-text">All Movies Are Available Right Now</p>

                            {/* </div> */}

                             <div className="bm-btn">

                                <button className="hero-btn">Add to list</button>

                                <button className="hero-btn">More Info</button>

                             </div> 
                        </div>

                    </div>


                    <div className="bm-content">

                        <div className="bm-movelist">

                            {readData.map((movie) => {

                                const { id, title, vote_average, name, media_type, bookmarkId, release_date, popularity, overview, first_air_date, backdrop_path } = movie

                                console.log(bookmarkId, "---BOOKMARKUID--")
                                return (

                                    <div className="card" key={id} id={id}>
                                        <div className="card-alpha">

                                            <div className="card-meta">

                                                <h2 className="card-title">{title || name}</h2>

                                                <a className="card-overview">{overview}</a>
                                                <ul>

                                                    <li><span>Date:</span> {release_date || first_air_date}</li>
                                                    <li><span>Popularity:</span> {popularity}</li>

                                                    <li><span>Rating:</span>

                                                        <svg xmlns="http://www.w3.org/2000/svg" className="Rate" color="#00ADB5" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor"
                                                            d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" className="Rate" color="#00ADB5" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor"
                                                            d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" className="Rate" color="#00ADB5" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor"
                                                            d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" className="Rate" color="#00ADB5" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor"
                                                            d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>
                                                    </li>
                                                </ul>




                                            </div>
                                            {/* <div className="movie-card"> */}
                                            <img className="card-image"
                                                src={backdrop_path ? `${img_300}${backdrop_path}` : unavailable}
                                                alt={title} />


                                            {/* </div> */}

                                        </div>
                                        <div className="card-beta">
                                            <a className="trailer-card">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="m9.5 16.5l7-4.5l-7-4.5v9ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 
                                                12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 
                                            2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/>
                                                </svg>
                                                WATCH TRAILER
                                            </a>

                                            <div className="delete-btn" onClick={() => handleDelete(bookmarkId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg"  className="trash" width="36" height="36" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 
                                                     1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                                                </svg>
                                            </div>

                                            <p className="media-type"> {media_type}  SERIES</p>

                                        </div>


                                    </div>
                                )


                            })}

                        </div>


                    </div>

                </div>


            }

        </>

    )
}

