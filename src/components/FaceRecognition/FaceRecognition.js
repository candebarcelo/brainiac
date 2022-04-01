import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img alt='' src={imageUrl} width='500px' height='auto' /> {/* height auto means it'll 
                                    automatically adjust to the width so it keeps the same proportions. */}
            </div>
        </div>
    )
}

export default FaceRecognition;
