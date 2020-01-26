import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import {FaStar} from 'react-icons/fa'
import {IoMdArrowRoundBack} from 'react-icons/io'

import './styles/MovieInfo.scss'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'

const MovieInfo = (props) => {

    const {movieID} = props.match.params

    const TRAILER_INFO_URL = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=11ab3c1329a135a090a272ae94cc11ca`
    const MOVIE_INFO_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es`
    const SIMILAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es`

    const [movieData, setMovieData] = useState({
        loading: false,
        error: null,
        trailer: undefined,
        similarMovies: undefined,
        data: undefined
    })

    const fetchTrailerData = async () => {
        setMovieData(prev => ({...prev, loading: true}))
        await axios.get(TRAILER_INFO_URL)
            .then(response => {
                setMovieData(prev => ({...prev, trailer: {...response.data.results[0]}}))
                setMovieData(prev => ({...prev, loading: false}))
            }).catch(error => setMovieData(prev => ({...prev, error: error.message})))
    }

    const fetchMovieData = async () => {
        setMovieData(prev => ({...prev, loading: true}))
        await axios.get(MOVIE_INFO_URL)
            .then(response => {
                setMovieData(prev => ({...prev, data: {...response.data}}))
                setMovieData(prev => ({...prev, loading: false}))
            }).catch(error => setMovieData(prev => ({...prev, error: error.message})))
    }

    const fetchSimilarMovies = async () => {
        setMovieData(prev => ({...prev, loading: true}))
        await axios.get(SIMILAR_MOVIES_URL)
        .then(response => {
            setMovieData(prev => ({...prev, similarMovies: {...response.data}}))
            setMovieData(prev => ({...prev, loading: false}))
        }).catch(error => setMovieData(prev => ({...prev, error: error.message})))
    }

    useEffect(() => {
        fetchMovieData()
        fetchTrailerData()
        fetchSimilarMovies()
    }, [])

    let originalLanguage
    if (movieData.data) {
        switch (movieData.data.original_language) {
            case 'en':
                originalLanguage = 'Inglés'
                break
            case 'es':
                originalLanguage = 'Español'
                break
            case 'fr':
                originalLanguage = 'Francés'
                break
            case 'ja':
                originalLanguage = 'Japonés'
                break
            case 'ru':
                originalLanguage = 'Ruso'
                break
            case 'it':
                originalLanguage = 'Italiano'
                break
            case 'ar':
                originalLanguage = 'Árabe'
                break
            case 'de':
                originalLanguage = 'Alemán'
                break
            case 'hi':
                originalLanguage = 'Hindi / Hindú'
                break
            default:
                originalLanguage = movieData.data.original_language
                break
        }
    }

    return(
        <>
        {movieData.data && movieData.trailer && movieData.similarMovies ?

            <Container className='movieInfo__page'>
            {/* <span className='backwardsButton mr-3' onClick={() => {
                }}>
                <IoMdArrowRoundBack/>
            </span> */}
            <Link className='backwardsButton' to='/'>
                <IoMdArrowRoundBack className='mr-2'/>
                home
            </Link>
            <div className='background' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieData.data.backdrop_path})`}}>
            </div>
                <h1>{movieData.data.title}</h1>
                <Row>
                    <Col className='imgContainer'>
                        <div className='rate'>
                            <p>{movieData.data.vote_average}</p>
                            <FaStar className='mb-1 ml-1'/>
                        </div>
                        <img src={`https://image.tmdb.org/t/p/w1280/${movieData.data.backdrop_path}`}/>
                        {movieData.data.tagline && 
                        <span>{`"${movieData.data.tagline}"`}</span>}
                    </Col>
                </Row>
                <Row>
                    <Col className='movieData'>
                        <p><span>Título original: </span>{`"${movieData.data.original_title}"`}</p>
                        <p><span>Lenguage original: </span>{originalLanguage}</p>
                        <p><span>Fecha de lanzamiento: </span>{movieData.data.release_date}</p>
                        <p><span>Duración: </span>{`${movieData.data.runtime} mins`}</p>
                        {movieData.data.genres.map((genre, index) => {
                            if(index + 1 === movieData.data.genres.length) {
                                return <span key={genre.id}>{`${genre.name}`}</span>
                            }
                            return <span key={genre.id}>{`${genre.name} / `}</span>
                            })
                        }
                        <a></a>
                    </Col>
                </Row>
                <Row>
                    <Col className='movieInfo__trailer'>
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${movieData.trailer.key}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                    </Col>
                </Row>
                <Row>
                    <Col className='movieOverview'>
                        <h3>Reseña</h3>
                        <p>{movieData.data.overview}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-1 similarMoviesCarousel'>
                        <h6>SUGERENCIAS</h6>
                        <Carousel 
                            indicators={false}
                            pauseOnHover={false}
                            interval={3000}
                            style={{overflow: 'visible!important'}}>
                        {movieData.similarMovies.results.map((movie) => (
                            <Carousel.Item key={movie.id}>
                                <div className='d-flex justify-content-center similarMovieCard' 
                                    onClick={() => {
                                    props.history.push(`/${movie.id}`)
                                    location.reload()
                                }}>
                                    <MovieCard movie={movie} onCarousel={true}/>
                                </div>
                            </Carousel.Item> 
                        ))}
                        </Carousel>
                    </Col>
                </Row>
            </Container>
            : <Loader />
        }
        </>
    )
}

export default withRouter(MovieInfo)