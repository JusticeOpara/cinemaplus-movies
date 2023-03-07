import React from "react";
import "./modal.css";
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom'
import { bookmark } from "../Firebase";
import HomePage from "../components/HomePage";
import { useAuth } from "../StoredDirectory/authContext";

export default function Modal({ setOpenModal, modelMovies }) {
    const { user } = useAuth()
    console.log(user, "-----userlkoooooooooooAuthContext")

    // const navigate = useNavigate()
    
    const img_300 = "https://image.tmdb.org/t/p/w300"
    const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
    // const { id, poster_path, title, vote_average, name, media_type, release_date, first_air_date,overview } = movie
									

    const { id,poster_path, title,vote_average, release_date, first_air_date, popularity, overview,backdrop_path } = modelMovies
    const object = { id,poster_path, title,vote_average, release_date, first_air_date ,popularity,overview,backdrop_path }
    
    console.log(object, "--modalMoviesObject")

    const handleBookmark = async () => {
        try {
            const bookMarkRef = await bookmark(user.uid,object);
             console.log(bookMarkRef, "BOOKMARKCONTENT#")

            
        } catch (error) {

            console.log(error, "-TOASTERROR")
        }


    }



    return (

        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button className="closeBtn"
                        onClick={() => {
                            setOpenModal(false)
                        }} >

                        X
                    </button>
                </div>

                <div className="hero">
                    <div className="contentModalImage">
                        <img
                            className="movie-poster"
                            src={modelMovies.poster_path ? `${img_300}${modelMovies.poster_path}` : unavailable}
                            alt={modelMovies.title}
                        />

                    </div>

                    <div className="contentModalDescription">

                        <p>{modelMovies.title || modelMovies.name}</p>
                        <p>{modelMovies.overview}</p>
                        <span className="">{modelMovies.release_date || modelMovies.first_air_date}</span>

                        <button onClick={handleBookmark} className="contentModalBtn">Add to Bookmark</button>


                    </div>

                </div>
            </div>
        </div>
    );
}
