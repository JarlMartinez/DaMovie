import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Navbar from '../components/Navbar'
import DBMovies from '../components/DBMovies'
import DBFooter from '../components/DBFooter'

import { bringUpcoming, bringGenres, bringTopRated, bringNowPlaying } from '../actions'

import './styles/Dashboard.scss'
import Loader from '../components/Loader'

const Dashboard = (props) => {

    const TOTAL_PAGES = 10
    
    const { bringUpcoming,
            bringNowPlaying,
            bringTopRated,
            bringGenres,
            loading,
            error,
            data,
            location: {pathname} } = props

    const [selection, setSelection] = useState({
            category: 'Mejor Valoradas',
            genre: 'Todos',
            search: ''
        })

    useEffect(() => {
        if(!data.movies.genres){
            bringGenres()
        }
        if(data.movies.categories.topRated.length === 0) {
            bringTopRated(TOTAL_PAGES)
        }
        if(data.movies.categories.nowPlaying.length === 0) {
            bringNowPlaying(TOTAL_PAGES)
        }
        if(data.movies.categories.upcoming.length === 0) {
            bringUpcoming(TOTAL_PAGES)
        }
    }, [])
    
    const handleGenreChange = e => {
        setSelection({
            ...selection,
            genre: e.target.value
        })
    }
    
    const handleCategorieChange = e => {
        setSelection({
            ...selection,
            category: e.target.value
        })
    }

    const handleInputChange = e => {
        setSelection({
            ...selection,
            search: e.target.value
        })
    }

    const displayContent = () => {
        if (loading) return <Loader />

        if (error) return <h1>Error</h1>
        
        return(
            <DBMovies
            selection={selection}
            movies={data.movies}/>
        )
    }

    return(
        <>
        <Navbar
            genres={data.movies.genres}
            handleGenreChange={handleGenreChange}
            handleCategorieChange={handleCategorieChange}
            handleInputChange={handleInputChange}/>
        {displayContent()}
        <DBFooter />
        </>
    )
}

const connectActions = {
    bringTopRated,
    bringGenres,
    bringNowPlaying,
    bringUpcoming
}

//Retornamos el store completo pq sólo hay un estado inicial en éste caso, y lo usamos para toda la app
const connectReducers = store => store

export default connect(connectReducers, connectActions)(Dashboard)