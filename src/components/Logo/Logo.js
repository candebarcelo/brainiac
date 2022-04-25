import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2 center" options={{ max : 55 }} style={{ height: 130, width: 130 }} >
                {/* this is from the react-tilt package */}
                <div className="Tilt-inner pa3"> 
                    <img alt='logo' style={{paddingTop: '10px', height: 80, width: 80}} src={brain} />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;