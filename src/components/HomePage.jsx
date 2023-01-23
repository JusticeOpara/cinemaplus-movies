import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
// import './styles.css'
import { useRouteLoaderData } from 'react-router-dom';
import '../App.css';




export default function HomePage() {
	const [response, setResponse] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	const url = "https://api.themoviedb.org/3/trending/all/day?api_key=548b87909aaf9fd5305170f710122e89"
	const img_300 = "https://image.tmdb.org/t/p/w300"
	const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";


	const fetchedData = async () => {
		setIsLoading(true)
		try {

			const { data: innerData } = await axios.get(url);

			const movieList = [...innerData?.results];
			console.log(movieList, "MOVELIST")

			setResponse(movieList);

		} catch (error) {
			console.log(error)

		} finally {
			setIsLoading(false)
		}



	};


	useEffect(() => {

		fetchedData()

	}, []);



	console.log(response, "--DATA")

	return (

		<>
			{isLoading ? <p>Loading..</p> :


				<div className='root'>
					<div className='main-content'>


						<div className='header'>

							<p className="header-text">Cineam<a style = {{color:"blue"}}>Plus</a> </p>
							<p className='sub-text'>home</p>
							<p className="sub-text">About us</p>
							<p className='sub-text'>BookMarker^</p>

						 <form> 
								<input type="text" className='search-box' placeholder='Search...' />

							</form> 


							<div className='login-btn'>
								<Link to="/Login">Sign In</Link>
							</div>

						</div>

						<div className="MuiContainer-root" >

							<div className="trending">

								{response.map((movie) => {
									return (
										<div className='media' key={movie.id} id={movie.id}>
											<span className='card-rate'>{movie.vote_average}</span>

											<img
												className="poster"
												src={movie.poster_path ? `${img_300}${movie.poster_path}` : unavailable}
												alt={movie.title}
											/>
											<p>{movie.title || movie.name}</p>
											<span className="subTitle">
												{movie.media_type}
												<span className="subTitle">{movie.release_date || movie.first_air_date}</span>
											</span>
										</div>
									)



								})}

							</div>

						</div>

					</div>

				</div>


			}
		</>

	);

}

