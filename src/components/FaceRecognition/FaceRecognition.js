import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' /> {/* height auto means it'll 
                                    automatically adjust to the width so it keeps the same proportions. */}
                <div 
                    className='bounding-box' 
                    style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                    </div> {/* empty div, this'll be the bounding box, thx to css. */}
            </div>
        </div>
    )
}

export default FaceRecognition;
