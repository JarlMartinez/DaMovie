import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import MovieInfo from './pages/MovieInfo'

export default () => {

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/:movieID' component={MovieInfo}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}