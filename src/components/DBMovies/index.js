import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import MovieCard from '../MovieCard'

import './index.scss'
 
export default ({
    selection,
    movies: { categories: { upcoming, topRated, nowPlaying } } }) => {

    let currentCategory = topRated

    switch (selection.category) {
        case 'Proximamente':
            currentCategory = upcoming
            break
        case 'Mejor valoradas':
            currentCategory = topRated
            break
        case 'En carteleras':
            currentCategory = nowPlaying
            break
    }

    let filtered

    if (currentCategory) {
        switch (selection.genre) {
            case 'Todas':
                filtered = currentCategory
                break
            case 'Acción':
                filtered = currentCategory.filter(m => m.genre_ids.includes(28))
                break
            case 'Aventura':
                filtered = currentCategory.filter(m => m.genre_ids.includes(12))
                break
            case 'Animación':
                filtered = currentCategory.filter(m => m.genre_ids.includes(16))
                break
            case 'Comedia':
                filtered = currentCategory.filter(m => m.genre_ids.includes(35))
                break
            case 'Crimen':
                filtered = currentCategory.filter(m => m.genre_ids.includes(80))
                break
            case 'Documental':
                filtered = currentCategory.filter(m => m.genre_ids.includes(99))
                break
            case 'Drama':
                filtered = currentCategory.filter(m => m.genre_ids.includes(18))
                break
            case 'Familia':
                filtered = currentCategory.filter(m => m.genre_ids.includes(10751))
                break
            case 'Fantasía':
                filtered = currentCategory.filter(m => m.genre_ids.includes(14))
                break
            case 'Historia':
                filtered = currentCategory.filter(m => m.genre_ids.includes(36))
                break
            case 'Terror':
                filtered = currentCategory.filter(m => m.genre_ids.includes(27))
                break
            case 'Música':
                filtered = currentCategory.filter(m => m.genre_ids.includes(10402))
                break
            case 'Misterio':
                filtered = currentCategory.filter(m => m.genre_ids.includes(9648))
                break
            case 'Romance':
                filtered = currentCategory.filter(m => m.genre_ids.includes(10749))
                break
            case 'Ciencia ficción':
                filtered = currentCategory.filter(m => m.genre_ids.includes(878))
                break
            case 'Película de TV':
                filtered = currentCategory.filter(m => m.genre_ids.includes(10770))
                break
            case 'Suspense':
                filtered = currentCategory.filter(m => m.genre_ids.includes(53))
                break
            case 'Bélica':
                filtered = currentCategory.filter(m => m.genre_ids.includes(10752))
                break
            case 'Western':
                filtered = currentCategory.filter(m => m.genre_ids.includes(37))
                break
            default:
                filtered = currentCategory
                break
        }
    }

    if (selection.search !== '') {

        const compareMovie = (movie, index, array) => {
            for(let i = 0; i < array.length; i++) {
                if(movie.id === array[i].id) {
                    if(i === index) {
                        continue
                    }
                    return false
                }
            }
            return true
        }
        
        const theSearch = selection.search.toLowerCase()
        const allMoviesWithDuplicates = topRated.concat(upcoming, nowPlaying)
        const allMovies = allMoviesWithDuplicates.filter((movie, index, array) => compareMovie(movie, index, array))
        filtered = allMovies.filter(movie => movie.title.toLowerCase().includes(theSearch))
    }

    const numberOfPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const [currentPage, setCurrentPage] = useState(1)
      
    const changePage = e => {
        const selectedPage = Number(e.target.attributes.value.value)
        setCurrentPage(selectedPage)
        window.scrollTo(0, 0)
    }

    const MOVIES_PER_PAGE = 24
    const beggining = MOVIES_PER_PAGE*(currentPage-1)
    const end = (MOVIES_PER_PAGE*currentPage)-1

    filtered = filtered.slice(beggining, end)

    const displayMovies = () => {
        if (filtered.length === 0) {
            return (
                <Col className='noMoviesLabelWrapper'>
                    <h2>¡No hay películas!</h2>
                </Col>
            )
        }
        return (
        filtered.map(movie => (
            <Col key={movie.id} className='colMovieCard'>
                <Link to={`/${movie.id}`}>
                    <MovieCard movie={movie} />
                </Link>
            </Col>
        ))
        )
    }

    return (
        <Container className='moviesContainer'>
            <Row>
                {filtered && displayMovies()}
            </Row>
            <Row>
                <Col className='divOfPages'>
                    {numberOfPages.map((each, index) => {
                        if(currentPage === each) {
                            return (
                                <span value={each} className='linkToPage currentPage' key={index}>
                                    {each}
                                </span>
                            )
                        } else {
                            return(
                                <span value={each} className='linkToPage' key={index} onClick={changePage}>
                                    {each}
                                </span>
                            )
                        }
                    })}
                </Col>
            </Row>
        </Container>
    )
}

