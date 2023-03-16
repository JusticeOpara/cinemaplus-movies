import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
// import './styles.css'
import { useRouteLoaderData } from 'react-router-dom';
import '../App.css';
import Modal from '../Modal/Modal';



export default function HomePage() {
	const [response, setResponse] = useState([]);
	const [isLoading, setIsLoading] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	const [movies, setMovies] = useState()

	const url = "https://api.themoviedb.org/3/trending/all/day?api_key=548b87909aaf9fd5305170f710122e89"
	const img_300 = "https://image.tmdb.org/t/p/w300"
	const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

	console.log(movies, "--MovieState")

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

							<div className="header-content">
								<p className="header-text">Cineam<a style={{ color: "#00ADB5" }}>Plus</a> </p>
								{/* <p className='sub-text'>home</p> */}
								<p className="sub-text">About us</p>
								<p className='sub-text'>
									<Link to="/auth/book-mark" style={{color:"#fff" ,hover:"000"}}>Bookmark^</Link></p>

							</div>

							<form>
								<input type="text" className='search-box' placeholder='Search...' />

							</form>


							<div className='login-btn'>
								<Link to="/Login" style={{ color: "#fff" }}>Sign out</Link>
							</div>

						</div>

						<div className="MuiContainer-root" >

							<div className="trending">

								{response.map((movie) => {

									const { id, poster_path, title, vote_average, name, media_type, release_date, first_air_date } = movie

									return (
										<div
											onClick={() => { setModalOpen(true); setMovies(movie) }}

											className='media' key={id} id={id}>
											<span className='card-rate'>{vote_average}</span>

											<img
												className="poster"
												src={poster_path ? `${img_300}${poster_path}` : unavailable}
												alt={title}
											/>
											<b className='title'>{title || name}</b>
											<span className="subTitle">
												{media_type}
												<span className="subTitle">{release_date || first_air_date}</span>
											</span>
										</div>
									)


								})}

								{modalOpen && <Modal setOpenModal={setModalOpen} modelMovies={movies} />}
							</div>

						</div>

					</div>

					<hr></hr>

					<div className='footer'>
						<div className='footer-container'>
							<div className="col">
								<h3 className="section-title">
									<b>CINEMAPLUS COLLECTION</b>
									– Best Place for Movies
								</h3>

								<p className=" text-section">
									Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
									and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
									Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
								</p>

								<p className="text-section">
									All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
									making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
									combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
									The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic
									words etc.
								</p>
							</div>


							<div className="footer-content">
								<a className="footer-logo">
									Cineam<a style={{ color: "blue" }}>Plus</a>
								</a>

								<span className="footer-copyright">© HOTFLIX, 2019—2021
									Create by <a href="https://justiceopara.github.io/my-portfolio/" target="_blank">Justice Opara</a>
								</span>

								<nav className="footet-nav">
									<a>About Us</a>
									<a>Contacts</a>
									<a>Privacy policy</a>
								</nav>

								<svg xmlns="http://www.w3.org/2000/svg" className="footer-button" width="3em" height="3em"
									viewBox="0 0 24 24"><rect x="0" y="0" width="25" height="25" fill="none" stroke="none" /><path fill="currentColor" d="M21 19a2 
								2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14m-8-1V9.5l3.5 3.5l1.42-1.42L12 5.66l-5.92 5.92L7.5 13L11 9.5V18h2Z"/></svg>
								{/* <button className="footer-back" type="button">
									
								</button> */}
							</div>

						</div>

					</div>


				</div>

			}
		</>

	);

}


