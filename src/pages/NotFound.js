import React, { Fragment } from 'react'

import DBFooter from '../components/DBFooter'

import nf from '../assets/pageNotFound.gif'

import './styles/NotFound.scss'

const NotFound = () => {

    const handleClick = e => {
        window.history.back()
    }

    return(
        <Fragment>
            <div className='pageNotFound'>
                <img src={nf} alt='Not Found gif'/>
                <span onClick={handleClick}>Regresar</span>
            </div>
            <DBFooter />
        </Fragment>
    )
}

export default NotFound