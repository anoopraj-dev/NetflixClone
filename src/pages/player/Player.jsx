import React, { useEffect, useState } from 'react'
import './Player.css'
import backArrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const navigate = useNavigate();

  const {id} = useParams();

  const [errMsg,setErrMsg] = useState(null);

  const [movie, setMovie] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  })

  const BASE_URL = import.meta.env.VITE_MOVIE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const endPoint = `${BASE_URL}${id}/videos${API_KEY}`

  const fetchMovie = async () => {
    try {
      const response = await fetch(endPoint);

      if(!response.ok){
        throw new Error (`HTTP error: ${response.status}`)
      }

      const data = await response.json();
      setMovie(data.results[1])

    } catch (error) {
      console.error('Failed to fetch',error);
      setErrMsg('Unable to load movies. Please try again later!')
    }
  }

  useEffect(()=>{
    fetchMovie();
  },[])

  return (
    <div className='player'>
      {
        errMsg? <h3>{errMsg}</h3>:
      <>
        <img src={backArrow} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${movie.key}`}frameborder="0" title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{movie.published_at.slice(0,10)}</p>
        <p>{movie.name}</p>
        <p>{movie.type}</p>
      </div>
      </>
}

    </div>
  )
}

export default Player
