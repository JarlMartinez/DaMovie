import React from 'react'

import Container from 'react-bootstrap/Container'

import TMDbLogo from '../../assets/TheMDb.png'
import './index.scss'

export default () => {
    return(
        <footer>
            <Container className='footerContainer'>
                <div className='dbFooter-1'>
                <abbr data-toggle='tooltip' title="This product uses the TMDb API but is not endorsed or certified by TMDb."><img src={TMDbLogo} alt='The Movie DB logo'/></abbr>
                </div>
                <div className='dbFooter-2'>
                <p>© 2019 all rights reserved. Made by <a href='https://github.com/JarlMartinez' target='_blank' rel='noopener noreferrer'>JarlMartinez</a></p></div>
            </Container>
        </footer>
    )
}