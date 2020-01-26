import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import App from './App'
import reducers from './reducers'
import initialState from './assets/initialState.js'

const app = document.getElementById('app')
const store = createStore(reducers, initialState, applyMiddleware(reduxThunk))

const renderApp = () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>, app)
}

if(module.hot) {
    module.hot.accept('./App', () => {
        renderApp()
    })    
}

renderApp()
