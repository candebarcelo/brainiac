import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    // create a box for each face in the boxes array
    const faceBoxes = boxes.map((box) => 
        <div 
            className='bounding-box' 
            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
        </div> 
    )

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' /> {/* height auto means it'll 
                                    automatically adjust to the width so it keeps the same proportions. */}
                {faceBoxes /* here go all the bounding boxes for each face, thx to css. */ }
            </div>
        </div>
    )
}

export default FaceRecognition;
