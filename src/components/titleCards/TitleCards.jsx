import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cardsData from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const cardsRef = useRef();


  const API_URL = import.meta.env.VITE_TMDB_API_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const IMG_BASE_URL = import.meta.env.VITE_TMDB_IMG_BASE_URL;
  const endPoint = `${API_URL}${category ? category : 'now_playing'}${API_KEY}`

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  const fetchData = async () => {
    try {
      const response = await fetch(endPoint);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setApiData(data.results);
    } catch (error) {
      console.error('fetch failed', error);
      setErrorMsg(" Unable to load movies. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      {
        errorMsg ? (
          <div className="error-message">{errorMsg}</div>
        ) :
          <div className="card-list" ref={cardsRef}>
            {
              apiData.map((card, index) => {
                return <Link to={`/player/${card.id}`} className="card" key={index}>
                  <img src={IMG_BASE_URL+card.backdrop_path} alt="" />
                  <p>{card.original_title}</p>
                </Link>
              })
            }
          </div>
      }

    </div>
  )
}

export default TitleCards
