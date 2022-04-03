import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn === true) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={() => onRouteChange('signout')} /* when u click on sign out, change route 
                                                            to signout so that we go to the sign in page. */
                    className='f3 link dim black underline pa3 pointer'
                    >Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={() => onRouteChange('signin')} 
                    className='f3 link dim black underline pa3 pointer'
                    >Sign In</p>
                <p 
                    onClick={() => onRouteChange('register')} 
                    className='f3 link dim black underline pa3 pointer'
                    >Register</p>
            </nav>
        )
    }
}

export default Navigation;