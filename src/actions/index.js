import axios from 'axios'

export const bringGenres = () => async dispatch => {
    dispatch({
        type: 'LOADING'
    })
        await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es')
        .then(response => {
            dispatch({
                type: 'BRING_GENRES',
                payload: response.data.genres
            })
        })
        .catch(error => {
            const theError = 'Error cargando géneros: ' + error.message
            dispatch({
                type: 'ERROR',
                payload: theError
            })
        })
}

export const bringTopRated = (i) => async (dispatch) => {
    dispatch({
        type: 'LOADING'
    })
        await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es&page=${i}`)
        .then(response => {
            dispatch({
                type: 'BRING_TOP_RATED',
                payload: response.data.results
            })
        })
        .catch(error => {
            const theError = 'Error cargando Top-Rated: ' + error.message
            dispatch({
                type: 'ERROR',
                payload: theError
            })
        })
    }
    
    export const bringNowPlaying = (i) => async dispatch => {
        dispatch({
            type: 'LOADING'
        })
        await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es&page=${i}`)
        .then(response => {
            dispatch({
                type: 'BRING_NOW_PLAYING',
                payload: response.data.results
            })
        })
        .catch(error => {
            const theError = 'Error cargando Now-Playing: ' + error.message
            dispatch({
                type: 'ERROR',
                payload: theError
            })
        })
}

export const bringUpcoming = (i) => async dispatch => {
    dispatch({
        type: 'LOADING'
    })
        await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es&page=${i}`)
        .then(response => {
            dispatch({
                type: 'BRING_UPCOMING',
                payload: response.data.results
            })
        })
        .catch(error => {
            const theError = 'Error cargando Upcoming: ' + error.message
            dispatch({
                type: 'ERROR',
                payload: theError
            })
        })
}