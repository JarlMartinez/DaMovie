import React from 'react'
import { FaSearch } from 'react-icons/fa'

import './index.scss'

export default ({genres, handleCategorieChange, handleGenreChange, handleInputChange}) => {
    return(
        <nav>
            <div className='searchInputDiv'>
                <FaSearch className='searchInputDiv__icon' />
                <input placeholder='¿Pelicula?' onChange={handleInputChange}/>
            </div>
            <div className='dropDownSelections'>
                <select onChange={handleGenreChange}>
                    <option>Todas</option>
                    {genres &&
                    genres.map(genre => (
                        <option key={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <select onChange={handleCategorieChange}>
                    <option>Mejor valoradas</option>
                    <option>En carteleras</option>
                    <option>Proximamente</option>
                </select>
            </div>
        </nav>
    )
}