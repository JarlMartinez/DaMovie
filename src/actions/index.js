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

export const bringTopRated = (totalPages) => async (dispatch) => {
    dispatch({
        type: 'LOADING'
    })
    try {
        for(let i = 1; i <= totalPages; i++) {
            const page1 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es&page=${i}`)
            dispatch({
                type: 'BRING_TOP_RATED',
                payload: page1.data.results
            })
        }
    } catch (err) {
        const error = new Error('Error cargarndo Top Rated Movies' + err.message)
        console.log(error)
        dispatch({
            type: 'ERROR',
            payload: error
        })
    }
}
    
export const bringNowPlaying = (totalPages) => async dispatch => {
    dispatch({
        type: 'LOADING'
    })
    try {
        for(let i = 1; i <= totalPages; i++) {
            const page1 = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es&page=${i}`)
            dispatch({
                type: 'BRING_NOW_PLAYING',
                payload: page1.data.results
            })
        }
    } catch (err) {
        const error = new Error('Error cargarndo Top Rated Movies' + err.message)
        console.log(error)
        dispatch({
            type: 'ERROR',
            payload: error
        })
    }
}

export const bringUpcoming = (i) => async dispatch => {
    dispatch({
        type: 'LOADING'
    })
    try {
        for(let i = 1; i <= totalPages; i++) {
            const page1 = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=11ab3c1329a135a090a272ae94cc11ca&language=es&page=${i}`)
            dispatch({
                type: 'BRING_UPCOMING',
                payload: page1.data.results
            })
        }
    } catch (err) {
        const error = new Error('Error cargarndo Top Rated Movies' + err.message)
        console.log(error)
        dispatch({
            type: 'ERROR',
            payload: error
        })
    }
}