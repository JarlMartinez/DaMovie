import React from 'react'
import { FaStar } from 'react-icons/fa'

import './index.scss'

export default ({movie, onCarousel = false}) => {

    return(
        <div className='movieCard'>
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='Poster movie'/>
            {onCarousel === false && <p>{movie.title}</p>}
            <div className='movieCard__rate'>
                <FaStar className='mb-1 mr-1'/>
                <p>{movie.vote_average}</p>
            </div>
        </div>
    )
}