import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const baseURL = "https://api.themoviedb.org/3/trending/all/day?api_key=548b87909aaf9fd5305170f710122e89"

export default function TestingOne() {
  const[page,setPage] = useState(1)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(baseURL).then((data) => {

      const {data: innerData} = data;

      const movieList = [...innerData?.results];
      console.log(movieList,"MOVELIST")
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