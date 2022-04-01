import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png'

const Navigation = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                {/* this is from the react-tilt package */}
                <div className="Tilt-inner pa3"> 
                    <img alt='logo' style={{paddingTop: '5px'}} src={brain} />
                </div>
            </Tilt>
        </div>
    )
}

export default Navigation;