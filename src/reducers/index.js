
export default (state, action) => {

    switch(action.type) {
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: action.paylaod
            }
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'BRING_GENRES':
            return {
                ...state,
                data: {
                    ...state.data,
                    movies: {
                        ...state.data.movies,
                        genres: action.payload
                    }
                },
                loading: false
            }
        case 'BRING_TOP_RATED':
            return {
                ...state,
                data: {
                    ...state.data,
                    movies: {
                        ...state.data.movies,
                        categories: {
                            ...state.data.movies.categories,
                            // I was trying to push the response into the array, didnt work... dont use push within reducers !!
                            // topRated: state.data.movies.categories.topRated.concat(action.payload)
                            topRated: state.data.movies.categories.topRated.concat(action.payload)
                        }
                    }
                },
                loading: false
            }
        case 'BRING_NOW_PLAYING': 
            return {
                ...state,
                data: {
                    ...state.data,
                    movies: {
                        ...state.data.movies,
                        categories: {
                            ...state.data.movies.categories,
                            nowPlaying: state.data.movies.categories.nowPlaying.concat(action.payload)
                        }
                    }
                },
                loading: false
            }
        case 'BRING_UPCOMING': 
            return {
                ...state,
                data: {
                    ...state.data,
                    movies: {
                        ...state.data.movies,
                        categories: {
                            ...state.data.movies.categories,
                            upcoming: state.data.movies.categories.upcoming.concat(action.payload)
                        }
                    }
                },
                loading: false
            }
        default: 
            return {
                ...state
            }
    }    
}