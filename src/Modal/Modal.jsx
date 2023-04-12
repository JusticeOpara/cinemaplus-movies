import React from "react";
import "./modal.css";
import { bookmark } from "../Firebase";
import { useAuth } from "../StoredDirectory/authContext";
import { useState } from 'react';

export default function Modal({ setOpenModal, modelMovies }) {

    const [isAdding, setIsAdding] = useState(true);
    const { user } = useAuth();
    // console.log(user, "-----userlkoooooooooooAuthContext")



    const img_300 = "https://image.tmdb.org/t/p/w300"
    const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";



    const { id, poster_path, title, name, vote_average, release_date, first_air_date, popularity, overview, backdrop_path,media_type } = modelMovies
    const object = { id, poster_path, title, name, vote_average, release_date, first_air_date, popularity, overview, backdrop_path,media_type }

    // console.log(object, "--modalMoviesObject")

    const handleBookmark = async () => {
        setIsAdding(false);
        try {
            const bookmarkPost = await bookmark(user.uid, object);
            console.log(bookmarkPost, "BOOKMARKCONTENT#")

        } catch (error) {

            console.log(error, "-TOASTERROR")
        }


    }


    return (

        <div className="modalBackground">
            <div className="modalContainer">
                {/* <div className="titleCloseBtn"> */}
                    <button className="closeBtn"
                        onClick={() => {
                            setOpenModal(false)
                        }} >

                        X
                    </button>
                {/* </div> */}

                <div className="hero">
                    
                        <img
                            className="movie-poster"
                            src={modelMovies.poster_path ? `${img_300}${modelMovies.poster_path}` : unavailable}
                            alt={modelMovies.title}
                        />

                    

                    <div className="contentModalDescription">

                        <p className="contentModalTitle">{modelMovies.title || modelMovies.name}</p>
                        <p className="contentModalOverview">{modelMovies.overview}</p>
                        <span className="">{modelMovies.release_date || modelMovies.first_air_date}</span> 

                        <button onClick={handleBookmark} className="contentModalBtn"> 
                        {isAdding ? 'Add To Bookmark ' : 'Added to Bookmark... ' }
                        </button>


                    </div>

                </div>
            </div>
        </div>
    );
}
